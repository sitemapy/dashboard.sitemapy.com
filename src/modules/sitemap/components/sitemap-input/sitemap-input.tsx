import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { connector, ContainerProps } from "./sitemap-input.container";

export const Wrapper: React.FC<ContainerProps> = (props) => {
  const formSchema = z.object({
    sitemap_url: z.string().url({
      message: "Invalid sitemap URL",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sitemap_url: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.onSubmit(values.sitemap_url);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex w-full items-center gap-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="sitemap_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/sitemap.xml"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Analyze</Button>
        </form>
      </Form>
    </div>
  );
};

Wrapper.displayName = "SitemapInput";

export const SitemapInput = connector(Wrapper);
