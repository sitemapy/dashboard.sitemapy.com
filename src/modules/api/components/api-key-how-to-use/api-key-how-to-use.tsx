import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { connector, ContainerProps } from "./api-key-how-to-use.container";

const get_curl_command = (
  api_key: string
) => `curl -X GET "https://api.sitemapy.com/v1/sitemap"
  -H "x-api-key: ${api_key}"
`;

const get_python_command = (api_key: string) => `import requests

url = "https://api.sitemapy.com/v1/sitemap"
headers = {
  "x-api-key": "${api_key}"
}
`;
const get_javascript_command = (
  api_key: string
) => `const axios = require('axios');

const response = await axios.get('https://api.sitemapy.com/v1/sitemap', {
  headers: {
    'x-api-key': '${api_key}',
  },
});
`;

const get_ruby_command = (api_key: string) => `require 'net/http'
require 'uri'
require 'json'

uri = URI.parse('https://api.sitemapy.com/v1/sitemap')
request = Net::HTTP::Get.new(uri)
request['x-api-key'] = '${api_key}'
`;

type Language = "bash" | "python" | "javascript" | "ruby";

const generate_code = (
  api_key: string,
  language: string
): { code: string; language: Language } => {
  switch (language) {
    case "curl":
      return { code: get_curl_command(api_key), language: "bash" };
    case "python":
      return { code: get_python_command(api_key), language: "python" };
    case "javascript":
      return { code: get_javascript_command(api_key), language: "javascript" };
    case "ruby":
      return { code: get_ruby_command(api_key), language: "ruby" };
  }
  throw new Error("Invalid language");
};

const get_html = async (params: { code: string; language: Language }) => {
  const html = await codeToHtml(params.code, {
    lang: params.language,
    theme: "github-light",
  });
  return html;
};

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const [html, setHtml] = useState<string>("");
  const [language, setLanguage] = useState<string>("curl");

  useEffect(() => {
    get_html(generate_code(props.api_key, language)).then(setHtml);
  }, [language, props.api_key]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-auto rounded-md border border-slate-200 p-4 text-slate-900">
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: html as string }}
        />

        <div className="absolute right-2 top-2 flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="curl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curl">curl</SelectItem>
              <SelectItem value="python">python</SelectItem>
              <SelectItem value="javascript">javascript</SelectItem>
              <SelectItem value="ruby">ruby</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export const ApiKeyHowToUse = connector(Wrapper);
