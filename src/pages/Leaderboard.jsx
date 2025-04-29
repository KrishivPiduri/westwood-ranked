// pages/Leaderboard.jsx
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Leaderboard() {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();
    // Example data – replace this with real backend data (Firebase, Supabase, etc.)
    useEffect(() => {
        const sampleData = [
            {
                id: 1,
                name: "Jordan Lee",
                gpa: 4.0,
                profilePic: "https://i.pravatar.cc/150?img=1",
                ecs: ["Debate Club", "Math Olympiad"],
            },
            {
                id: 2,
                name: "Aisha Khan",
                gpa: 3.95,
                profilePic: "https://i.pravatar.cc/150?img=2",
                ecs: ["Robotics Team", "Student Council"],
            },
            {
                id: 3,
                name: "Carlos Ramirez",
                gpa: 3.88,
                profilePic: "",
                ecs: ["Football", "Drama Club"],
            },
        ];
        setProfiles(sampleData);
    }, []);

    // Sort by GPA descending
    const sortedProfiles = [...profiles].sort((a, b) => b.gpa - a.gpa);

    return (
        <div className="min-h-screen bg-white pt-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
                    Leaderboard
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full border border-orange-200 rounded-xl overflow-hidden shadow">
                        <thead className="bg-orange-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-orange-600">Rank</th>
                            <th className="py-3 px-4 text-left text-orange-600">Name</th>
                            <th className="py-3 px-4 text-left text-orange-600">GPA</th>
                            <th className="py-3 px-4 text-left text-orange-600">Extracurriculars</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedProfiles.map((profile, index) => (
                            <tr
                                key={index}
                                onClick={() => navigate(`/profile/${profile.id}`)}
                                className="border-t border-orange-100 hover:bg-orange-50 transition cursor-pointer "
                            >
                                <td className="py-3 px-4 font-semibold text-orange-500">
                                    #{index + 1}
                                </td>
                                <td className="py-3 px-4 flex items-center gap-3">
                                    {profile.profilePic ? (
                                        <img
                                            src={profile.profilePic}
                                            alt={profile.name}
                                            className="w-10 h-10 rounded-full object-cover border border-orange-200"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
                                            {profile.name[0]}
                                        </div>
                                    )}
                                    <span>{profile.name}</span>
                                </td>
                                <td className="py-3 px-4">{profile.gpa.toFixed(2)}</td>
                                <td className="py-3 px-4">
                                    {profile.ecs.join(", ")}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
