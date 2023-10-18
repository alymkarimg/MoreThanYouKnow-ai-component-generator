import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import RoundFilledNumber from "../components/RoundFilledNumber";
import { useChatGPT } from "../components/useChatGPT";
import { SpinnerDotted } from "spinners-react";
import Skeleton from 'react-loading-skeleton'


const Home: NextPage = () => {
    const [prompt, setPrompt] = useState("");
    const { exportedGeneratedCode, isLoading, generatedCode, generateUI, restart } = useChatGPT(() => setPrompt(""));


    return (
        <div className="flex w-full mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>AI to UI component generator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="grid grid-cols-1 md:grid-cols-2 gap-3 container mx-auto px-4">
                <div className="flex flex-col my-10">
                {/* star on github */}
                <a
                    className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-green-300 bg-white px-4 py-2 text-sm text-black shadow-md transition-colors hover:bg-white-100 mb-5 animate-wobble"
                    href="https://github.com/yuvalsuede/ai-component-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github />
                    <p>Star on GitHub ❤️</p>
                </a>

                {/* title and subtitle */}
                <h1 className="sm:text-3xl text-2xl max-w-1xl font-normal text-green-400">
                    Ask for any <span style={{color: '#0091ff'}}>component...</span>
                </h1>
                <h2 className="sm:text-xl text-xl max-w-1xl font-light text-white-600  sm:mt-2">
                    AI will generate it for you
                </h2>

                {/* Form */}
                <div className="max-w-xl w-full">
                    <div className="flex mt-10 items-center space-x-3">
                        <RoundFilledNumber number={1}/>
                        <p className="text-left font-medium flex align-center">
                            Describe which component you need
                        </p>
                    </div>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="w-full text-black rounded-md shadow-sm focus:border-black focus:ring-black my-5"
                        placeholder={'e.g. an about us section with 3 columns of team members, centered text, rounded profile images'}
                    />

                    {!isLoading && (<div className="flex flex-row justify-between pt-8">
                        <div className="flex flex-row">
                        <RoundFilledNumber mt={true} number={2}/>
                        <button
                            disabled={!prompt}
                            className=" ml-5 bg-green-600 rounded-xl text-white font-medium px-4 py-2 hover:bg-white hover:text-black"
                            onClick={(e) => {
                                e.preventDefault();
                                generateUI(prompt);
                            }}
                        >
                            Generate my Component!&rarr;
                        </button>
                        </div>
                        <button
                            className="bg-white-200 rounded-xl text-white font-medium px-4 py-2 hover:bg-green-600"
                            onClick={(e) => {
                                e.preventDefault();
                                restart();
                            }}>
                            Restart
                        </button>
                    </div>
                    )}
                    {isLoading && (
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-10"
                            disabled
                        >
                            <SpinnerDotted color="#4cff00" />
                        </button>
                    )}
                </div>
                {/* Toast */}
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                />
                </div>
                <ResizablePanel>
                    <AnimatePresence mode="wait">
                        <motion.div className="space-y-10 my-10">
                            {generatedCode && (
                                <>
                                    <div>
                                        <h2 className="sm:text-1xl text-1xl font-normal text-white-600 font-normal mx-auto">
                                            Click the element to copy the code 👇
                                        </h2>
                                    </div>
                                    <div
                                        className="space-y-8 flex flex-col items-center justify-center  mx-auto w-full">
                                        <div
                                            className="w-full text-black whitespace-normal bg-white rounded-xl p-4 hover:bg-gray-100 transition cursor-copy max-w-full flex items-center justify-center"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    exportedGeneratedCode
                                                );
                                                toast(
                                                    "Code copied to clipboard",
                                                    {
                                                        icon: "✂️",
                                                    }
                                                );
                                            }}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: generatedCode,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {!generatedCode && (
                                <Skeleton baseColor="white" highlightColor="#999999" duration={5} count={18} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
            <Footer />
        </div>
    )
        ;
};

export default Home;
