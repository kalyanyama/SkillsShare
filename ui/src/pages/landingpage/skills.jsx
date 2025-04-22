import React, { useEffect, useState } from "react";
import { GET_METHOD } from "../../authentication/get-methods";
import { Card } from "../../components/card";

export const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await GET_METHOD("api/skills-category");
        const data = await response.json();
        if (data.success) {
          setSkillsData(data?.data || []);
        } else {
          setError("No skills data available.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="space-y-24 container mx-auto px-5" id="skills">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-base font-semibold text-indigo-600">
          What’s cool about this platform?
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Choose your skills here
        </p>
        <p className="mt-6 text-lg text-gray-600">
          This is your free hangout for learning software stuff. From HTML to
          full-stack — get the help you need, ask doubts without hesitation, and
          share your skills too!
        </p>
      </div>

      {loading && <p>Loading skills...</p>}

      {error && <p>{error}</p>}

      <div className="space-y-12 ">
        {skillsData.length === 0 ? (
          <p>No skills available at the moment. Please check back later.</p>
        ) : (
          skillsData.map((category) => (
            <div key={category.name} className="space-y-12">
              <div className="border-b py-4">
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.skills.map((item) => (
                  <Card details={item} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
