"use client";
import { LogOut } from "lucide-react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LogoutButtonProps {
  //   username?: string;
  //   email?: string;
  //   onLogout?: () => void;
}

export function LogoutButton({}: //   username = "John Doe",
LogoutButtonProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  onClick={() => console.log("Logout clicked")}
                >
                  <LogOut className="h-8 w-8 text-center" />
                  Logout
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col items-center">
                  <p>Are you sure you want to logout?</p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="px-4 py-2 bg-destructive text-white rounded"
                      onClick={() => console.log("Yes clicked")}
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-black rounded"
                      onClick={() => console.log("No clicked")}
                    >
                      No
                    </button>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
