export const fetchEmployeeById = async (id) => {
    try {
      const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/admin/${id}`);
      if (!response.ok) {
        throw new Error(`Employee not found: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  };
  export const updateEmployee = async (id, updatedData) => {
    try {
      const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/admin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update employee: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };
  export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`https://projectmanagementwebsite.onrender.com/api/admin/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete employee");
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
};
  
