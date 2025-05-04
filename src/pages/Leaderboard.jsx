import { useEffect, useState } from "react";

export default function RankedProfilesPage() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            setLoading(true);
            try {
                const indexRes = await fetch("http://westwood-profile-data.krishivpiduri.com/index.json");
                const indexData = await indexRes.json();

                const fullProfiles = await Promise.all(
                    indexData.map(async ({ id, votes }) => {
                        try {
                            const profileRes = await fetch(`http://westwood-profile-data.krishivpiduri.com/profiles/${id}.json`);
                            const profileData = await profileRes.json();
                            return { ...profileData, id, votes: votes ?? 0 };
                        } catch (err) {
                            console.error(`Failed to load profile for ${id}:`, err);
                            return null;
                        }
                    })
                );

                const validProfiles = fullProfiles.filter(Boolean);
                const sorted = validProfiles.sort((a, b) => (b.votes || 0) - (a.votes || 0));
                setProfiles(sorted);
            } catch (err) {
                console.error("Failed to fetch ranked profiles:", err);
                setProfiles([]);
            }
            setLoading(false);
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return <p className="text-center text-orange-600 mt-10">Loading ranked profiles...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">Top Cracked Profiles</h1>
            <div className="space-y-6">
                {profiles.map((profile, index) => (
                    <div
                        key={profile.id}
                        className="p-4 border border-orange-300 rounded-lg shadow-sm bg-white"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${profile.id}`}
                                alt={profile.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-orange-600">
                                    #{index + 1} <a className="cursor-pointer hover:underline" href={`/profile/${profile.id}`}>{profile.name || "Unnamed"}</a>
                                </h2>
                                <p className="text-sm text-gray-600">GPA: {profile.gpa}</p>
                                <p className="text-sm text-gray-800 font-semibold">Votes: {profile.votes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
