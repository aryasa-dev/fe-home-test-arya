"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {};

export default function RegisterPage({}: Props) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      // role: "User",
    },
  });
  const router = useRouter();

  const registerApi = useApi(
    {
      method: "POST",
      path: "auth/register",
      auth: false,
    },
    {
      manual: true,
    }
  );

  const loginApi = useApi(
    {
      method: "POST",
      path: "auth/login",
      auth: false,
    },
    {
      manual: true,
    }
  );

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await registerApi.refetch({ bodyRequest: values });

      const res = await loginApi.refetch({
        bodyRequest: {
          username: values.username,
          password: values.password,
        },
      });

      // save token from login response
      const token = res.token;
      if (token) {
        Cookies.set("ACCESS_TOKEN", token);
        router.push("/");
      }
    } catch (err) {
      console.error("Register or Login failed:", err);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Input Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Input Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <div className="relative">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full appearance-none font-normal"
                      )}
                      {...field}
                    >
                      <option value="">Select Role</option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-6" disabled={form.formState.isSubmitting}>
            {registerApi.loading ? (
              <span>
                <Loader2Icon className="animate-spin" /> Loading
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-x-1 text-sm mt-6 justify-center text-slate-600">
        <p>Already have an account?</p>
        <Link href={"/login"} className="underline text-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
