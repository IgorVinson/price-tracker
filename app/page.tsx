import Image from "next/image";
import Searchbar from "@/components/Searchbar";
import Table from "@/components/Table";

const Home = async () => {
    return (
        <>
            <section className="px-6 md:px-20 py-24">
                <div className="flex max-xl:flex-col gap-16">
                    <div className="flex flex-col justify-center">
                        <p className="small-text">
                            Smart Shopping Starts Here:
                            <Image
                                src="/assets/icons/arrow-right.svg"
                                alt="arrow-right"
                                width={16}
                                height={16}
                            />
                        </p>

                        <h1 className="head-text">
                            Unleash the Power of
                            <span className="text-primary"> PriceChecker</span>
                        </h1>

                        <p className="mt-6">
                            Powerful, self-serve product and growth analytics to
                            help you convert, engage, and retain more.
                        </p>

                        <Searchbar />
                    </div>

                    {/*<HeroCarousel />*/}
                </div>
                <div className="mt-8 bg-gray-100 rounded-[20px] p-8">
                    <h2 className="section-text text-center">
                        List of yours saved products
                    </h2>
                    <Table />
                </div>
            </section>
        </>
    );
};

export default Home;
