import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function ProfileForm() {
    const [ecs, setEcs] = useState([
        { title: "", description: "", logo: "", thumbnailFile: null },
    ]);
    const [profilePicFile, setProfilePicFile] = useState(null);

    const addEC = () => {
        setEcs([...ecs, { title: "", description: "", logo: "", thumbnailFile: null }]);
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
            setProfilePicFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("You must be logged in to submit your profile.");
            return;
        }

        const uid = user.uid;

        const body = {
            uid: uid,
            name: form.name.value,
            gpa: form.gpa.value,
            studentId: form.studentId.value,
            ecs: ecs.map(({ title, description, logo }) => ({ title, description, logo }))
        };

        try {
            const response = await fetch("https://d2sbujyu9h.execute-api.us-east-1.amazonaws.com/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Server error");
            }

            const uploadUrls = data["uploadUrls"];

            // Upload profile picture if provided
            if (profilePicFile && uploadUrls.profilePic) {
                await fetch(uploadUrls.profilePic, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'image/jpeg' },
                    body: profilePicFile
                });
            }

            // Upload EC thumbnails if provided
            for (let i = 0; i < ecs.length; i++) {
                const file = ecs[i].thumbnailFile;
                if (file && uploadUrls[`ec_${i}_thumbnail`]) {
                    await fetch(uploadUrls[`ec_${i}_thumbnail`], {
                        method: 'PUT',
                        headers: { 'Content-Type': 'image/jpeg' },
                        body: file
                    });
                }
            }

            alert("Profile submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error submitting profile: " + err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-2xl bg-white border border-orange-600 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Create Your Profile
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
                                name="profilePic"
                                onChange={handleProfilePicChange}
                                className="border border-orange-300 rounded-lg px-3 py-2 cursor-pointer hover:border-2"
                            />
                        </div>
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

                    {/* Student ID Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">
                            Student ID (used for verification)
                        </label>
                        <input
                            type="text"
                            name="studentId"
                            required
                            pattern="s\d{5}"
                            title="Must start with 's' followed by 5 digits (e.g. s12345)"
                            className="w-full border border-orange-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="e.g. s12345"
                        />
                    </div>

                    {/* GPA Section */}
                    <div>
                        <label className="block text-orange-600 font-medium mb-1">GPA</label>
                        <input
                            type="number"
                            name="gpa"
                            min="0"
                            max="6"
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
                                        Short Description <span className="text-gray-500">(max 100 chars)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={ec.description}
                                        maxLength={100}
                                        onChange={(e) => updateEC(index, "description", e.target.value)}
                                        className="w-full border border-orange-300 rounded px-2 py-1"
                                        placeholder="e.g. Build and program autonomous robots"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-orange-600">
                                        Thumbnail (optional image upload)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            updateEC(index, "thumbnailFile", file);
                                        }}
                                        className="border border-orange-300 rounded px-2 py-1 mt-1"
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
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
