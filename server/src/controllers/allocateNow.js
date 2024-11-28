import getAllAgents from "./getAllAgents.js";
import getAgentsAllocations from "./getAllAgentsAllocation.js";

const allocateNow=async ()=> {
  const allocations = await getAgentsAllocations();
  const allAgents = await getAllAgents();

  // Validate the format of imported data
  if (!Array.isArray(allAgents)) {
    throw new Error("Error: getAllAgents() did not return an array.");
  }
  if (!Array.isArray(allocations)) {
    throw new Error("Error: getAgentsAllocations() did not return an array.");
  }

  // Step 1: Initialize a workload map
  const workloadMap = allAgents.reduce((acc, agent) => {
    acc[agent.id] = {
      count: 0, // Count of active allocations
      lastAllocationEnd: new Date(0), // Last allocation end date
      createdAt: new Date(agent.createdAt), // Agent creation timestamp
    };
    return acc;
  }, {});

  // Step 2: Update workload map with current allocations
  allocations.forEach((allocation) => {
    if (workloadMap[allocation.agentId]) {
      workloadMap[allocation.agentId].count += 1;
      workloadMap[allocation.agentId].lastAllocationEnd = new Date(
        Math.max(
          workloadMap[allocation.agentId].lastAllocationEnd.getTime(),
          new Date(allocation.endDate).getTime()
        )
      );
    }
  });

  // Step 3: Find the agent with the least workload
  let bestAgent = null;
  let minWorkload = Infinity;

  allAgents.forEach((agent) => {
    const { count, lastAllocationEnd, createdAt } = workloadMap[agent.id];

    if (
      count < minWorkload || // Fewer allocations
      (count === minWorkload &&
        lastAllocationEnd.getTime() <
          workloadMap[bestAgent]?.lastAllocationEnd.getTime()) || // Earlier end time
      (count === minWorkload &&
        lastAllocationEnd.getTime() ===
          workloadMap[bestAgent]?.lastAllocationEnd.getTime() &&
        createdAt.getTime() > workloadMap[bestAgent]?.createdAt.getTime()) // Newer agent
    ) {
      bestAgent = agent.id;
      minWorkload = count;
    }
  });

  return bestAgent; // Return the id of the best agent
}
export default allocateNow