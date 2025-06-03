"use client";

import {
  IconArrowAutofitRight,
  IconArrowRight,
  IconCirclePlusFilled,
  IconMail,
  IconMoneybagPlus,
  IconSignRight,
  type Icon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useActionState } from "react";
import { actionAddMoney } from "@/app/action";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  const [state, addMoneyAction, pending] = useActionState(
    actionAddMoney,
    undefined
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-neutral-700 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              {/* <IconCirclePlusFilled /> */}
              <IconMoneybagPlus />
              <span>Add Money</span>
            </SidebarMenuButton>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <IconArrowRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form action={addMoneyAction}>
                  <DialogHeader>
                    <DialogTitle>Add money</DialogTitle>
                    <DialogDescription>
                      Add money to your account here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 mt-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" placeholder="title" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="amount">Amount (₱) or Amount (PHP)</Label>
                      <Input id="amount" name="amount" placeholder="amount" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        placeholder="description"
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <span className="sr-only">Inbox</span>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer ${
                      active &&
                      "bg-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-300 active:bg-neutral-800 active:text-neutral-300"
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
