"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StarRating } from "../star-rating";

const skillSchema = z.object({
  name: z.string().min(5, {
    message: "Skill name is required.",
  }),
  proficiency: z
    .number()
    .min(1, {
      message: "Proficiency must be between 1 and 5.",
    })
    .max(5, {
      message: "Proficiency must be between 1 and 5.",
    }),
});

const formSchema = z.object({
  skills: z.array(skillSchema),
});

export default function SkillsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [
        {
          name: "",
          proficiency: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.skills);
  }

  return (
    <Form {...form}>
      <h1 className="text-2xl font-bold mb-6">Skills</h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-6 flex justify-between items-center "
          >
            <div className=" flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`skills.${index}.proficiency`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Proficiency</FormLabel>
                    <FormControl>
                      <StarRating
                        value={Number(field.value)}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}

        <div className="flex w-full justify-end gap-4 ">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                name: "",
                proficiency: 0,
              })
            }
          >
            Add Skill
          </Button>
          <Button type="submit">Save All Skills</Button>
        </div>
      </form>
    </Form>
  );
}
