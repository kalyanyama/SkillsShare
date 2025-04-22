import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_METHOD } from "../../authentication/get-methods";
import { useGlobalAccess } from "../../authentication/GlobalAccessProvider";
import { POST_METHOD } from "../../authentication/post-methods";
import { Card } from "../../components/card";

export const SkillPage = () => {
  const { skillId } = useParams();
  const { user } = useGlobalAccess();
  const [skill, setSkill] = useState(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tutors, setTutors] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        setLoading(true);

        const skillRes = await GET_METHOD(`api/skills/${skillId}`);
        const skillData = await skillRes.json();
        if (skillData.success) {
          setSkill(skillData.data);
          if (skillData.tutors) {
            setTutors(skillData.tutors);
          }
        }

        const allSkillsRes = await GET_METHOD(`api/skills`);
        const allSkillsData = await allSkillsRes.json();
        if (allSkillsData.success) {
          const filtered = allSkillsData.data
            .filter((s) => s._id !== skillId)
            .slice(0, 3);
          setRelatedSkills(filtered);
        }
      } catch (error) {
        console.error("Error loading skill page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [skillId]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-svh grid place-content-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleChat = async (tutorId) => {
    try {
      const roomId = user._id + "_" + tutorId + "_" + skillId;
      const roomRes = await POST_METHOD(`api/chats/room`, {
        userId: user._id,
        tutorId,
        roomId,
      });
      const roomData = await roomRes.json();

      if (roomData.success) {
        navigator(`/chat/${roomId}`);
      } else {
        console.error("Error creating room:", roomData.error);
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {skill && (
        <div className="mb-8 min-h-[400px] grid place-content-center text-center">
          <div className="p-3 border w-fit rounded-full mx-auto">
            <img src={skill.image} className="size-6" alt={skill.name} />
          </div>
          <h1 className="text-[5vw] font-bold text-blue-500">{skill.name}</h1>
          <p className="text-gray-600 mt-2">
            {skill.description || "No description available."}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-y py-4">
          Available Tutors
        </h2>

        {tutors.length > 0 ? (
          <div className="space-y-4 min-h-[400px]">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="flex border justify-between rounded-lg p-4 shadow-sm items-center gap-4"
              >
                <div>
                  <h3 className="text-lg font-medium">{tutor.name}</h3>
                  <p className="text-sm text-gray-500">{tutor.email}</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500"
                  onClick={() => handleChat(tutor._id)}
                >
                  Chat
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tutors available</p>
        )}
      </div>

      {relatedSkills.length > 0 && (
        <div className="mt-20 space-y-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-y py-4">
            Related Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {relatedSkills.map((s) => (
              <Card key={s._id} details={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
