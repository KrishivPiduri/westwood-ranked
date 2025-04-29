import { useState } from "react";

export default function ProfileForm() {
    const [ecs, setEcs] = useState([
        { title: "", description: "", logo: "" }
    ]);
    const [profilePic, setProfilePic] = useState("");
    const [profilePicFile, setProfilePicFile] = useState(null);

    const addEC = () => {
        setEcs([...ecs, { title: "", description: "", logo: "" }]);
    };

    const removeEC = (index) => {
        if (ecs.length === 1) return;
        const updated = ecs.filter((_, i) => i !== index);
        setEcs(updated);
    };

    const updateEC = (index, field, value) => {
        const updated = ecs.map((ec, i) =>
            i === index ? { ...ec, [field]: value } : ec
        );
        setEcs(updated);
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicFile(URL.createObjectURL(file));
            setProfilePic("");
        }
    };

    const handleProfilePicUrlChange = (e) => {
        setProfilePic(e.target.value);
        setProfilePicFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            gpa: e.target.gpa.value,
            studentId: e.target.studentId.value,
            profilePic: profilePicFile || profilePic,
            ecs: ecs,
        };
        console.log("Submitting profile:", formData);
        // TODO: Send to backend (Firebase, Supabase, etc.)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-2xl bg-white border border-orange-600 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Submit Your Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">
                            Profile Picture (Optional)
                        </label>
                        <div className="flex space-x-4 items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                className="border border-orange-300 rounded-lg px-3 py-2 cursor-pointer hover:border-2"
                            />
                            <input
                                type="url"
                                value={profilePic}
                                onChange={handleProfilePicUrlChange}
                                className="border border-orange-300 rounded-lg px-3 py-2"
                                placeholder="Or paste image URL"
                            />
                        </div>

                        {(profilePicFile || profilePic) && (
                            <div className="mt-2">
                                <h4 className="text-sm text-orange-600">Profile Picture Preview:</h4>
                                <img
                                    src={profilePicFile || profilePic}
                                    alt="Profile Preview"
                                    className="mt-2 w-32 h-32 object-cover rounded-full"
                                />
                            </div>
                        )}
                    </div>

                    {/* Student ID Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">
                            Student ID <span className="text-gray-500 text-sm">(Format: s12345)</span>
                        </label>
                        <input
                            type="text"
                            name="studentId"
                            pattern="s\d{5}"
                            required
                            title="Must start with 's' followed by 5 digits"
                            className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. s12345"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            We only use this to verify your profile is legit. It won’t be shown publicly.
                        </p>
                    </div>

                    {/* Name Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            maxLength={50}
                            className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. Jordan Lee"
                        />
                    </div>

                    {/* GPA Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">GPA</label>
                        <input
                            type="number"
                            name="gpa"
                            min="0"
                            max="5"
                            step="0.01"
                            required
                            className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. 3.75"
                        />
                    </div>

                    {/* Extracurriculars Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-3">
                            Extracurriculars
                        </label>

                        {ecs.map((ec, index) => (
                            <div
                                key={index}
                                className="border border-orange-200 p-4 rounded-lg mb-4 space-y-3 relative"
                            >
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-semibold text-orange-500">Activity #{index + 1}</h4>
                                    {ecs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeEC(index)}
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-orange-600">
                                        Title <span className="text-gray-500">(max 50 chars)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={ec.title}
                                        maxLength={50}
                                        onChange={(e) => updateEC(index, "title", e.target.value)}
                                        className="w-full border border-orange-300 rounded px-2 py-1"
                                        placeholder="e.g. Robotics Club"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-orange-600">
                                        Short Description{" "}
                                        <span className="text-gray-500">(max 100 chars)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={ec.description}
                                        maxLength={100}
                                        onChange={(e) =>
                                            updateEC(index, "description", e.target.value)
                                        }
                                        className="w-full border border-orange-300 rounded px-2 py-1"
                                        placeholder="e.g. Build and program autonomous robots"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-orange-600">
                                        Logo URL <span className="text-gray-500">(optional)</span>
                                    </label>
                                    <input
                                        type="url"
                                        value={ec.logo}
                                        onChange={(e) => updateEC(index, "logo", e.target.value)}
                                        className="w-full border border-orange-300 rounded px-2 py-1"
                                        placeholder="https://example.com/logo.png"
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addEC}
                            className="mt-2 text-sm text-orange-600 font-medium underline hover:text-orange-700"
                        >
                            + Add another extracurricular
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
