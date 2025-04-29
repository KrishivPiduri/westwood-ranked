import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Simulated async API call
const fetchProfileData = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: "Jordan Lee",
                gpa: 3.92,
                profilePic: "https://i.pravatar.cc/150?img=8",
                ecs: [
                    {
                        title: "Robotics Club",
                        description: "Build and program autonomous robots for competitions.",
                        logo: "https://cdn-icons-png.flaticon.com/512/2933/2933813.png",
                    },
                    {
                        title: "Student Council",
                        description: "Organize school events and represent student interests.",
                        logo: "https://cdn-icons-png.flaticon.com/512/1828/1828463.png",
                    },
                ],
            });
        }, 1000); // Simulate network delay
    });
};

export default function ProfilePage() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            const data = await fetchProfileData(userId);
            setProfile(data);
            setLoading(false);
        };
        loadProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-orange-600 font-medium text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center">
                <p className="text-red-600">Profile not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white px-4 py-10">
            <div className="max-w-3xl mx-auto bg-white border border-orange-500 rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-6 mb-6">
                    <img
                        src={profile.profilePic}
                        alt={profile.name}
                        className="w-24 h-24 object-cover rounded-full border border-orange-300"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-orange-700">{profile.name}</h2>
                        <p className="text-md text-gray-600">GPA: {profile.gpa}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-orange-600 mb-4">Extracurriculars</h3>
                    <div className="space-y-4">
                        {profile.ecs.map((ec, index) => (
                            <div
                                key={index}
                                className="border border-orange-200 rounded-lg p-4 flex items-start space-x-4"
                            >
                                {ec.logo && (
                                    <img
                                        src={ec.logo}
                                        alt={ec.title}
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                )}
                                <div>
                                    <h4 className="text-md font-semibold text-orange-700">
                                        {ec.title}
                                    </h4>
                                    <p className="text-sm text-gray-700">{ec.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
