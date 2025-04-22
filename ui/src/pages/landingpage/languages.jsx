import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { GET_METHOD } from "../../authentication/get-methods";

export const Languages = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await GET_METHOD("api/skills");
        const data = await response.json();

        if (data.success) {
          setSkillsData(data.data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Marquee autoFill gradient>
        {skillsData.map((skill) => (
          <div key={skill.id || skill.name} className="mx-6">
            <img src={skill.image} alt={skill.name} className="size-16" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};
