import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

interface CustomBreadcrumProps {
  breadCrumPage: string;
  breadCrumpItems?: { link: string; label: string }[];
}

const CustomBreadcrum = ({
  breadCrumPage,
  breadCrumpItems,
}: CustomBreadcrumProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="font-semibold flex items-center ">
            <Home className="w-3 h-3 mr-2" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadCrumpItems &&
          breadCrumpItems.map((eachItem, id) => (
            <React.Fragment key={id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={eachItem.link}
                  className="font-semibold hover:text-sky-500"
                >
                  {eachItem.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">
            {breadCrumPage}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrum;
