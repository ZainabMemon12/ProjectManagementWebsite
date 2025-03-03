export const fetchProjectById = async (id) => {
    try {
      const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/project/${id}`);
      if (!response.ok) {
        throw new Error(`project not found: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  };
  export const updateProject = async (id, updatedData) => {
    try {
      const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/project/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };
  export const deleteProject = async (id) => {
    try {
        const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/project/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete project");
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
};
  
