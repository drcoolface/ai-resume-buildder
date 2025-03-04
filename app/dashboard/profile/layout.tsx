import ProfileProgress from "@/components/profile-progress";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProfileProvider>
    <section className="flex flex-col-reverse justify-center md:flex-row w-full  p-2 md:p-4 gap-4">
      <Card className="flex-1 ">
        <CardContent>{children}</CardContent>
      </Card>
      <div className="w-64 flex-shrink-0 mx-auto">
        <ProfileProgress />
      </div>
    </section>
    // </ProfileProvider>
  );
}
