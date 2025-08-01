"use client";
import React from "react";
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
import { useForm } from "react-hook-form";
import z from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";
import Cookies from "js-cookie";
import { Loader2Icon } from "lucide-react";
import { LoginResponse } from "@/types";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter()

  const { loading, error, refetch } = useApi<LoginResponse>(
    {
      method: "POST",
      path: "auth/login",
      auth: false,
    },
    {
      manual: true,
      onSuccess: (res) => {
        Cookies.set("ACCESS_TOKEN", res.token);
        Cookies.set("USER_ROLE", res.role)

        if (res.role === "User") {
          router.push("/articles")
        } else {
          router.push("/dashboard")
        }
        // window.location.href = "/";
      },
      onError: (err) => {
        console.error(err.response?.data);
      },
    }
  );

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    await refetch({ bodyRequest: values });
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
          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? <span className="flex items-center gap-x-1"><Loader2Icon className="animate-spin" /> Loading</span> : "Login"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-x-1 text-sm mt-6 justify-center text-slate-600">
        <p>Don’t have an account?</p>
        <Link href={"/register"} className="underline text-primary">
          Register
        </Link>
      </div>
    </div>
  );
}
