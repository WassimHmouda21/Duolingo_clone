import { Button } from "@/components/ui/button"
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-state-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost">
                    <Image
                        src="/cr_flag.jpg"
                        alt="Croatian"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Croatian
                </Button>
                <Button size="lg" variant="ghost">
                    <Image
                        src="/sp_flag.jpg"
                        alt="Spanish"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Spanish
                </Button>
                <Button size="lg" variant="ghost">
                    <Image
                        src="/fr_flag.jpg"
                        alt="French"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    French
                </Button>
                <Button size="lg" variant="ghost">
                    <Image
                        src="/it_flag.jpg"
                        alt="Italian"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Italian
                </Button>
                <Button size="lg" variant="ghost">
                    <Image
                        src="/jp_flag.jpeg"
                        alt="Japanese"
                        height={32}
                        width={40}
                        className="mr-4 rounded-md"
                    />
                    Japanese
                </Button>
            </div>
        </footer>
    );
}
