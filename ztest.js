
// Calculate difference in milliseconds
const timeDiff = new Date("2025-09-12T00:00:00.000+00:00").getTime() - new Date().getTime();
const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
console.log("Days difference:", daysDiff);

// Function to format date in a readable format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
};
  
// Function to format date for display in email (shorter format)
const formatDateForEmail = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
};
