import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const initialProfiles = [
    {
        name: "Jordan Lee",
        gpa: 3.85,
        elo: 1200,
        ecs: [
            {
                title: "Robotics Club",
                description: "Competed in regional competitions, leading the robot design team.",
                logo: "",
            },
            {
                title: "National Honor Society",
                description: "Organized community service projects and tutoring sessions.",
                logo: "",
            },
            {
                title: "Track and Field",
                description: "Varsity member, competed in long-distance events.",
                logo: "",
            },
        ],
        profilePic: "", // no pic
    },
    {
        name: "Alex Kim",
        gpa: 3.90,
        elo: 1300,
        ecs: [
            {
                title: "Debate Club",
                description: "Vice President, lead debates at regional tournaments.",
                logo: "",
            },
            {
                title: "Student Council",
                description: "Organized school events and advocated for student policies.",
                logo: "",
            },
            {
                title: "Volunteer at Local Shelter",
                description: "Worked to provide meals and shelter to homeless individuals.",
                logo: "",
            },
        ],
        profilePic: "", // no pic
    },
];

const PLACEHOLDER_IMG =
    "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";

export default function HomePage() {
    const [profiles, setProfiles] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfiles().then()
    }, []);

    const handleSelect = (index) => {
        setSelected(index);
    };

    const getProfilePic = (url) => url || PLACEHOLDER_IMG;

    const fetchProfiles = async () => {
        setLoading(true);
        // simulate network delay
        await new Promise((r) => setTimeout(r, 2000));
        // in a real app you'd fetch new data here—here, we'll just re-use the same two
        setProfiles(initialProfiles);
        setSelected(null);
        setLoading(false);
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
                            key={idx}
                            className="border border-orange-600 rounded-lg p-8 bg-white shadow-xl w-full md:w-96"
                        >
                            {selected === null ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        {/* silhouette for before state */}
                                        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                                        <h3 className="text-xl font-semibold text-orange-600 text-center">
                                            Profile #{idx + 1}
                                        </h3>

                                        <h4 className="text-sm font-semibold text-orange-600">
                                            <span className="font-bold">GPA:</span> {profile.gpa}
                                        </h4>
                                        <ul className="text-sm text-orange-500 space-y-2">
                                            {profile.ecs.map((ec, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center space-x-2 text-left"
                                                >
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
                                    {/* full detail after selection */}
                                    <h3 className="text-xl font-semibold text-orange-600">
                                        {profile.name}
                                    </h3>
                                    <img
                                        src={getProfilePic(profile.profilePic)}
                                        alt={profile.name}
                                        className="w-32 h-32 object-cover rounded-full mx-auto"
                                    />
                                    <p className="text-sm text-orange-500">
                                        <span className="font-bold">GPA:</span> {profile.gpa}
                                    </p>
                                    <p className="text-sm text-orange-500">
                                        <span className="font-bold">ELO:</span> {profile.elo}
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-sm text-orange-500 font-semibold">
                                            Extracurriculars:
                                        </p>
                                        {profile.ecs.map((ec, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                {ec.logo && (
                                                    <img
                                                        src={ec.logo}
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
            {/* Next button */}
            {/* Next button */}
            {selected !== null && !loading && (
                <>
                    <button
                        onClick={fetchProfiles}
                        disabled={loading}
                        className="mt-6 w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-200 disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>

                    {/* Call to action to submit profile */}
                    <button
                        onClick={() => navigate("/form")}
                        className="mt-4 text-sm text-orange-600 hover:underline transition duration-150 cursor-pointer"
                    >
                        Think you’re the most cracked in the school? Prove it.
                    </button>
                </>
            )}
        </div>
    );
}
