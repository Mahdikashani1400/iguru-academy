const $ = document;
const getCourses = async () => {
  const coursesContainer = $.querySelector(".learning_courses-boxes");
  // coursesContainer.innerHTML = ''
  const res = await fetch("http://localhost:4000/v1/courses", {});

  const result = await res.json();
  return result;
};

export { getCourses };
