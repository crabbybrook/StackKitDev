import { BoltFill, Copyright, Cross, Heart, Incognito } from "../Icons/allIcons";
import Essentials from "./Essentials";
import FootbarMenu from "./FootbarMenu";
export default function Footbar() {
    const year = new Date()
    return <div className="mt-auto flex justify-center items-center flex-col w-full gap-5 p-5 select-none">

        <div className="grid grid-cols-4 max-w-5xl w-full">

            <FootbarMenu logo={<Incognito size="md" />} title="100% Private" color="text-green-500" />
            <FootbarMenu logo={<BoltFill size="md" />} title="Lightning Fast" color="text-amber-300" />
            <FootbarMenu logo={<Cross size="md" />} title="No Sign-up" color="text-red-500" />
            <FootbarMenu logo={<Heart size="md" />} title="Free Forever" color="text-pink-500" />
        </div>

        <div className="gap-2 grid grid-cols-4 justify-center items-center mt-3">
            <a href='/privacy-policy' data-astro-prefetch>
                <Essentials text="Privacy Policy" />
            </a>
            <a href='/about' data-astro-prefetch>
                <Essentials text="About Us" />
            </a>
            <a href='/terms-of-service' data-astro-prefetch>
                <Essentials text="Terms of Service" />
            </a>
            <a href='/contact' data-astro-prefetch>
                <Essentials text="Contact Us" />
            </a>
        </div>

        <div className="text-white text-sm flex justify-center items-center mt-5">
            <Copyright size="xs" />
            <p className="ml-1">{year.getFullYear()}</p>
            <p className="text-white font-[Geist Sans] font-semibold text-md flex items-center ml-2">StackKitDev
            </p>

            . All Rights Reserved.
        </div>


    </div>
}