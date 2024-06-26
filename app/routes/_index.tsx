import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";
import { Fade } from "react-awesome-reveal";

import PublicLayout from "~/layouts/Public";
import ChooseUsSection from "~/components/sections/choose-us";
import Packages from "~/components/sections/packages";

import conversation from "~/assets/illustrations/conversation.svg";
import PackageController from "~/controllers/PackageController";
import { PackageInterface } from "~/types";
import { useLoaderData } from "@remix-run/react";

export default function Index() {
  const { packages } = useLoaderData<{
    packages: PackageInterface[];
  }>();
  console.log(packages);

  const header = (
    <div
      className={`flex items-center justify-between gap-5 md:px-10 px-6 text-white dark:text-white h-[50vh] md:h-[80vh]`}
    >
      <div className="flex-1 flex flex-col gap-3 md:gap-6">
        <Fade direction="down" duration={1500} triggerOnce className="">
          <p className="text-slate-400 font-nunito font-bold text-xl">
            Look no further for
          </p>
          <h1 className="text-indigo-600 font-montserrat font-extrabold text-6xl lg:text-7xl mb-4">
            Affordable Data Packages
          </h1>
          <Button
            variant="ghost"
            className="border-indigo-600 hover:!bg-indigo-600 font-montserrat text-indigo-600 hover:text-white !font-semibold w-max px-4"
            radius="lg"
          >
            Become an Agent
          </Button>
        </Fade>
      </div>

      <div className="md:w-1/2 h-full bg-no-repeat bg-cover bg-center md:block hidden">
        <Fade direction="up" duration={1500} triggerOnce>
          <img
            className="h-full w-full"
            src={conversation}
            alt="conversation"
          />
        </Fade>
      </div>
    </div>
  );

  return (
    <PublicLayout headerContent={header}>
      <div>
        <Packages packages={packages} />
        <ChooseUsSection />
      </div>
    </PublicLayout>
  );
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const packageController = new PackageController(request);
  const { packages } = await packageController.getAllPackages({
    limit: 10,
    page: 1,
    search_term: "",
  });

  return { packages };
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
