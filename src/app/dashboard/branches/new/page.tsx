import { auth } from "@/lib/auth";
import { requirePermission } from "@/lib/permissions";
import { PageHeader } from "@/components/ui/page-header";
import { BranchForm } from "../branch-form";
import { createBranch } from "../actions";

export default async function NewBranchPage() {
  const session = await auth();
  await requirePermission(session, "create", "branch");

  return (
    <div className="space-y-6">
      <PageHeader title="إضافة فرع جديد" subtitle="أدخل بيانات الفرع الجديد" />
      <BranchForm submitAction={createBranch} />
    </div>
  );
}
