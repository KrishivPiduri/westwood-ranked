import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/context/AuthContext";

const API_BASE = "https://d2sbujyu9h.execute-api.us-east-1.amazonaws.com";

export default function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [validatedEcs, setValidatedEcs] = useState({});
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [noMoreProfiles, setNoMoreProfiles] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchProfiles();
    }, []);

    useEffect(() => {
        if (user) checkUserHasProfile();
    }, [user]);

    const checkUserHasProfile = async () => {
        try {
            const res = await fetch(`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/profiles/${user.uid}.json`);
            setHasProfile(res.ok);
        } catch {
            setHasProfile(false);
        }
    };

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/profiles`);
            const data = await res.json();

            if (data.length < 2) {
                setNoMoreProfiles(true);
                setProfiles([]);
            } else {
                setProfiles(data);
                preloadECImages(data);
            }
        } catch (e) {
            console.error("Failed to fetch profiles:", e);
            setProfiles([]);
        }
        setSelected(null);
        setLoading(false);
    };

    const preloadECImages = async (profiles) => {
        const result = {};
        for (const profile of profiles) {
            result[profile.id] = [];
            for (let i = 0; i < profile.ecs.length; i++) {
                const url = `http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${profile.id}${i}`;
                try {
                    const res = await fetch(url, { method: "HEAD" });
                    result[profile.id][i] = res.ok ? url : null;
                } catch {
                    result[profile.id][i] = null;
                }
            }
        }
        setValidatedEcs(result);
    };

    const handleSelect = async (index) => {
        setSelected(index);
        const winner = profiles[index];
        const loser = profiles[1 - index];

        try {
            await fetch(`${API_BASE}/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    winner_id: winner.id,
                    loser_id: loser.id,
                }),
            });
        } catch (e) {
            console.error("Failed to submit vote:", e);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
            <h1 className="text-4xl font-semibold text-orange-600 mb-6">
                Which one is more Cracked?
            </h1>

            {loading ? (
                <div className="text-lg font-semibold text-orange-600">Loading...</div>
            ) : (
                <div className="flex space-x-8">
                    {profiles.map((profile, idx) => (
                        <div
                            key={profile.id}
                            className="border border-orange-600 rounded-lg p-8 bg-white shadow-xl w-full md:w-96"
                        >
                            {selected === null ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
                                        <h3 className="text-xl font-semibold text-orange-600 text-center">
                                            Profile #{idx + 1}
                                        </h3>
                                        <h4 className="text-sm font-semibold text-orange-600">
                                            <span className="font-bold">GPA:</span> {profile.gpa}
                                        </h4>
                                        <ul className="text-sm text-orange-500 space-y-2">
                                            {profile.ecs.map((ec, i) => (
                                                <li key={i} className="flex items-center space-x-2 text-left">
                                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                                    <div>
                                                        <h4 className="font-semibold text-orange-600">
                                                            {ec.title}
                                                        </h4>
                                                        <p className="text-xs">{ec.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => handleSelect(idx)}
                                        className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-orange-700 transition duration-200 cursor-pointer"
                                    >
                                        Choose
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center space-y-6">
                                    <h3 className="text-xl font-semibold text-orange-600">
                                        {profile.name || `Profile #${idx + 1}`}
                                    </h3>
                                    <img
                                        src={`http://westwood-profile-data.s3-website-us-east-1.amazonaws.com/assets/${profile.id}`}
                                        alt={profile.name}
                                        className="w-32 h-32 object-cover rounded-full mx-auto"
                                    />
                                    <p className="text-sm text-orange-500">
                                        <span className="font-bold">GPA:</span> {profile.gpa}
                                    </p>
                                    <p className="text-sm text-orange-500">
                                        <span className="font-bold">Votes:</span> {profile.votes}
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-sm text-orange-500 font-semibold">
                                            Extracurriculars:
                                        </p>
                                        {profile.ecs.map((ec, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                {validatedEcs[profile.id]?.[i] && (
                                                    <img
                                                        src={validatedEcs[profile.id][i]}
                                                        alt={ec.title}
                                                        className="w-8 h-8 object-cover rounded-full"
                                                    />
                                                )}
                                                <div className="text-left">
                                                    <h4 className="font-semibold text-orange-600">
                                                        {ec.title}
                                                    </h4>
                                                    <p className="text-xs">{ec.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* CTA Section */}
            {!loading && noMoreProfiles && hasProfile !== null && (
                <div className="mt-10 text-center space-y-4">
                    {hasProfile ? (
                        <>
                            <h2 className="text-xl font-semibold text-orange-600">You've seen all the profiles!</h2>
                            <p className="text-orange-600">
                                Know someone more cracked? Invite them to make a profile 👇
                            </p>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4 text-sm text-orange-700">
                                <p className="mb-2 font-medium">Copy and send this to your friend:</p>
                                <div className="bg-white p-3 rounded border text-left font-mono text-sm">
                                    <p>
                                        Hey, I just saw some crazy profiles on this app called Westwood Ranked 😂<br />
                                        You should make one too. Go here: <br />
                                        https://westwoodranked.krishivpiduri.com/form
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold text-orange-600">You've seen all the profiles!</h2>
                            <button
                                onClick={() => navigate("/form")}
                                className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-700 transition duration-200 cursor-pointer"
                            >
                                Add Your Profile
                            </button>
                        </>
                    )}
                </div>
            )}

            {!loading && selected !== null && !noMoreProfiles && (
                <button
                    onClick={fetchProfiles}
                    className="mt-6 w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-200 disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            )}
        </div>
    );
}
