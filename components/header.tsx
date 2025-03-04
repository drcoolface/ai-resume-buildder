import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarTrigger } from "./ui/sidebar";
import { VersionSwitcher } from "./version-switcher";

const versions = ["Gpt 3", "Gpt 4", "Deepseek"];
const Header = () => {
  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b px-4 max-w-6xl mx-auto">
      <div className="flex items-center space-x-2">
        <SidebarTrigger className="-ml-2" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbPage>Building Your Application</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <VersionSwitcher versions={versions} defaultVersion={versions[0]} />
      </div>
    </header>
  );
};

export { Header };
