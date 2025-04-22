import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import React from "react";

export const Featured = () => {
  const features = [
    {
      name: "Learn at your pace",
      description:
        "No pressure, no deadlines. Just chill and pick up the skills you want, when you want.",
      icon: CloudArrowUpIcon,
    },
    {
      name: "Ask anything",
      description:
        "Stuck somewhere? Ask your doubts and get help from people who’ve been there, done that.",
      icon: LockClosedIcon,
    },
    {
      name: "Practice and level up",
      description:
        "Put your skills to the test with real-world examples, mini projects, and practice problems.",
      icon: ServerIcon,
    },
  ];

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-xl">
              <h2 className="text-base font-semibold text-indigo-600">
                What’s cool about this platform?
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Pick up skills, clear your doubts, & grow with confidence.
              </p>
              <p className="mt-6 text-lg text-gray-600">
                This is your free hangout for learning software stuff. From HTML
                to full-stack — get the help you need, ask doubts without
                hesitation, and share your skills too!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline"> – {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <img
            alt="Learning screenshot"
            src="/featured.jpg"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
};
