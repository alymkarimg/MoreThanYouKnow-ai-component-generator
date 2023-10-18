import React from "react";

export default function Footer() {
    return (
        <footer className="text-center h-8 sm:h-16 w-full sm:pt-1 pt-2 border-t mt-2 flex sm:flex-row-reverse flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-2">
            <div>
                <span className="text-white-600 pr-3 font-black">By</span>
                <a
                    href="https://uk.linkedin.com/in/alym-karim-43232b138"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold hover:underline transition underline-offset-2 text-green-600"
                >
                    Alym Karim
                </a>
            </div>
        </footer>
    );
}
