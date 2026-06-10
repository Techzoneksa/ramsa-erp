import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/permissions";
import { PageHeader } from "@/components/ui/page-header";
import { BranchForm } from "../../branch-form";
import { updateBranch } from "../../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBranchPage({ params }: Props) {
  const session = await auth();
  await requirePermission(session, "update", "branch");

  const { id } = await params;
  const branch = await prisma.branch.findUnique({ where: { id } });

  if (!branch) notFound();

  const submitAction = async (formData: FormData) => updateBranch(id, formData);

  return (
    <div className="space-y-6">
      <PageHeader title={`تعديل الفرع: ${branch.nameAr}`} subtitle="تحديث بيانات الفرع" />
      <BranchForm
        isEdit
        defaultValues={{
          id: branch.id,
          code: branch.code,
          nameAr: branch.nameAr,
          nameEn: branch.nameEn || "",
          type: branch.type,
          status: branch.status,
          region: branch.region || "",
          city: branch.city,
          district: branch.district || "",
          street: branch.street || "",
          postalCode: branch.postalCode || "",
          shortAddress: branch.shortAddress || "",
          nationalAddress: branch.nationalAddress || "",
          phone: branch.phone || "",
          email: branch.email || "",
          managerName: branch.managerName || "",
          managerPhone: branch.managerPhone || "",
          isHeadOffice: branch.isHeadOffice,
          notes: branch.notes || "",
        }}
        submitAction={submitAction}
      />
    </div>
  );
}
