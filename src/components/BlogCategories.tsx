import React from "react";

const BlogCategories = () => {
  // Dummy categories data
  const categories = [
    { id: 1, name: "Technology", count: 12 },
    { id: 2, name: "Programming", count: 8 },
    { id: 3, name: "Web Development", count: 15 },
    { id: 4, name: "React", count: 10 },
    { id: 5, name: "JavaScript", count: 18 },
    { id: 6, name: "CSS", count: 7 },
    { id: 7, name: "Design", count: 5 },
    { id: 8, name: "Productivity", count: 3 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-80">
      <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
        Categories
      </h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href="#"
              className="flex items-center justify-between hover:text-blue-600 transition-colors duration-200"
            >
              <span className="text-gray-700 hover:text-blue-600">
                {category.name}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                {category.count}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
