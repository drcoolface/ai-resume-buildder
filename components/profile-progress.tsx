"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const steps = [
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Education", path: "/dashboard/profile/education" },
  { name: "Work Experience", path: "/dashboard/profile/work-experience" },
  { name: "Skills", path: "/dashboard/profile/skills" },
  { name: "Projects", path: "/dashboard/profile/projects" },
];

const ProfileProgress = () => {
  const pathname = usePathname();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-2">
          {steps.map((step, index) => {
            const isActive = pathname === step.path;
            const isCompleted =
              steps.findIndex((s) => s.path === pathname) > index;

            return (
              <Button
                key={index}
                asChild
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start px-2 py-1.5 hover:bg-accent ${
                  isActive ? "bg-primary/20 text-foreground" : ""
                }`}
              >
                <Link href={step.path}>
                  <div
                    className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-primary"
                        : isCompleted
                        ? "border-primary bg-primary"
                        : "border-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="h-3 w-3 text-primary-foreground" />
                    ) : (
                      <span
                        className={`text-xs ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isActive ? "font-medium" : "font-normal"
                    }`}
                  >
                    {step.name}
                  </span>
                </Link>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgress;
