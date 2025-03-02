import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
// import { ModeToggle } from "./darkmode-switch";

const Header = () => {
  return (
    <header className="flex h-16 w-full shrink-0 items-center  border-b px-4">
      {/* <div className="flex items-center space-x-2"> */}
      <SidebarTrigger className="-ml-1 mr-1" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:inline-flex">
            <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:inline-flex" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* </div> */}
      {/* <ModeToggle /> */}
    </header>
  );
};

export { Header };
