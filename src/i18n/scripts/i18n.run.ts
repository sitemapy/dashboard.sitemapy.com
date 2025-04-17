"use strict";

import { languages } from "@/i18n/constants/langs";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import restore from "../.keep/restore.en.json";
import en from "../messages/en.json";

dotenv.config();

const envSchema = z.object({
  OPEN_AI_API_KEY: z.string(),
  OPEN_AI_ORGANIZATION: z.string(),
  OPEN_AI_PROJECT: z.string(),
});

const env = envSchema.parse(process.env);

const translate = async (params: {
  text: string;
  to: string;
  from: string;
}) => {
  const data = JSON.stringify({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a translator. I'll give you sentences that you have to translate into the lang I submit.

        For example, if I give you from: fr, to: en, you have to translate from french to english.

        If you translate into korean, please only write in korean and no english words.

        Keep markdown formatting if it exists.

        Do not translate words that are in {}.

        The project is a web app, so please translate the words in a way that is easy to understand for a web app.
        This is a web app is Sitemapy. A website that helps you manage your sitemaps. People can use the API to request sitemaps.
        
        Give me only the translation.`,
      },
      {
        role: "user",
        content: `from:${params.from}, to:${params.to}
        
        ${params.text}`,
      },
    ],
    temperature: 0,
  });

  const config: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPEN_AI_API_KEY}`,
      "OpenAI-Organization": env.OPEN_AI_ORGANIZATION,
      "OpenAI-Project": env.OPEN_AI_PROJECT,
    },
    body: data,
  };

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    config
  );

  const json = (await response.json()) as {
    choices: [{ message: { content: string } }];
  };

  return json.choices.map(({ message }) => message.content).join("");
};

async function storeFile(json: Record<string, string>, lang: string) {
  const dir = path.resolve("src/i18n/messages/", `${lang}.json`);
  await fs.writeFile(dir, JSON.stringify(json), "utf-8");
}

async function compareNewKeys() {
  const keysThatHaveBeenCreated = Object.keys(en).filter(
    (key) => !(key in restore)
  );

  const keysThatHaveBeenDeleted = Object.keys(restore).filter(
    (key) => !(key in en)
  );

  const keysThatHaveBeenModified = Object.keys(en).filter((key) => {
    const valueInEnglish = en[key as keyof typeof en];
    const valueInRestored = restore[key as keyof typeof restore];

    if (valueInEnglish && valueInRestored) {
      return valueInEnglish !== valueInRestored;
    }

    return false;
  });

  return {
    created: keysThatHaveBeenCreated.map((key) => ({
      key,
      value: en[key as keyof typeof en],
      lang: "en",
    })),
    modified: keysThatHaveBeenModified.map((key) => ({
      key,
      value: en[key as keyof typeof en],
      lang: "en",
    })),
    deleted: keysThatHaveBeenDeleted,
  };
}

async function loadFile(lang: string) {
  return JSON.parse(
    await fs.readFile(`src/i18n/messages/${lang}.json`, "utf-8")
  ) as Record<string, string>;
}

async function removeRemovedKeys(removedKeys: string[], lang: string) {
  console.info(`Removing keys: ${removedKeys.join(", ")} from ${lang}`);

  const file = await loadFile(lang);

  const keysFromFile = Object.keys(file);
  const newFile: Record<string, string> = {};

  keysFromFile.forEach((key) => {
    if (!removedKeys.includes(key)) {
      newFile[key] = file[key];
    }
  });

  await storeFile(newFile, lang);
}

async function addCreatedKeys(
  createdKeys: Array<{ key: string; value: string; lang: string }>,
  lang: string
) {
  console.info(
    `Adding keys: ${createdKeys.map((k) => k.key).join(", ")} to ${lang}`
  );
  const imported = await loadFile(lang);

  const file = { ...imported };

  for (const key of createdKeys) {
    file[`${key.key}`] = await translate({
      text: key.value,
      to: lang,
      from: key.lang,
    });
  }

  await storeFile(file, lang);
}

async function updateModifiedKeys(
  modifiedKeys: Array<{ key: string; value: string; lang: string }>,
  lang: string
) {
  console.info(
    `Updating keys: ${modifiedKeys.map((k) => k.key).join(", ")} in ${lang}`
  );

  const imported = await loadFile(lang);

  const file = { ...imported };

  for (const key of modifiedKeys) {
    file[`${key.key}`] = await translate({
      text: key.value,
      to: lang,
      from: key.lang,
    });
  }

  await storeFile(file, lang);
}

async function storeRestoreFile() {
  const file = await loadFile("en");

  const dir = path.resolve("src/i18n/.keep/restore.en.json");
  await fs.writeFile(dir, JSON.stringify(file), "utf-8");
}

async function main() {
  const { created, deleted, modified } = await compareNewKeys();

  for (const lang of languages.filter((lang) => lang !== "en")) {
    if (deleted.length > 0) {
      await removeRemovedKeys(deleted, lang);
    } else {
      console.info(`No keys to remove`);
    }

    if (created.length > 0) {
      await addCreatedKeys(created, lang);
    } else {
      console.info(`No keys to add`);
    }

    if (modified.length > 0) {
      await updateModifiedKeys(modified, lang);
    } else {
      console.info(`No keys to update`);
    }
  }

  await storeRestoreFile();
}

main();
