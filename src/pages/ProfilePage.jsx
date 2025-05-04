import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [thumbnailUrls, setThumbnailUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votes, setVotes] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/profiles/${userId}.json`);
                const data = await res.json();
                setProfile(data);

                const indexRes = await fetch(`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/index.json`);
                const indexData = await indexRes.json();
                const userFromIndex = indexData.find((u) => u.id === userId);
                setVotes(userFromIndex?.votes ?? 0);

                const urls = await Promise.all(
                    data.ecs.map(async (_ec, i) => {
                        const url = `http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${userId}${i}`;
                        try {
                            const head = await fetch(url, { method: "HEAD" });
                            return head.ok ? url : null;
                        } catch {
                            return null;
                        }
                    })
                );
                setThumbnailUrls(urls);
            } catch (err) {
                console.error("Failed to load profile:", err);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/profiles/${userId}.json`);
                const data = await res.json();
                setProfile(data);

                const urls = await Promise.all(
                    data.ecs.map(async (_ec, i) => {
                        const url = `http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${userId}${i}`;
                        try {
                            const head = await fetch(url, { method: "HEAD" });
                            return head.ok ? url : null;
                        } catch {
                            return null;
                        }
                    })
                );
                setThumbnailUrls(urls);
            } catch (err) {
                console.error("Failed to load profile:", err);
            }
            setLoading(false);
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return <p className="text-center text-orange-600 mt-10">Loading profile...</p>;
    }

    if (!profile) {
        return <p className="text-center text-red-600 mt-10">Profile not found.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="text-center">
                <img
                    src={`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${userId}`}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-2xl font-bold text-orange-600">{profile.name}</h1>
                <p className="text-gray-700 mt-1">GPA: {profile.gpa}</p>
                <p className="text-gray-700 mt-1">Votes: {votes}</p>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-orange-600 mb-4">Extracurriculars</h2>
                <div className="space-y-4">
                    {profile.ecs.map((ec, index) => (
                        <div
                            key={index}
                            className="border border-orange-200 rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="font-semibold text-orange-500">{ec.title}</h3>
                            <p className="text-gray-700">{ec.description}</p>
                            {thumbnailUrls[index] && (
                                <img
                                    src={thumbnailUrls[index]}
                                    alt={`EC ${index}`}
                                    className="w-24 h-24 mt-2 rounded-md object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
