
async function fetchData (petitionMethod, backendURLBase,endpoint,info){
    const requestOptions : RequestInit = {
        method: `${petitionMethod}`,
        redirect: 'follow',
    }   
    const data = await fetch(`${backendURLBase}${endpoint}?info=${info}`, requestOptions);
    const datos = await data.json()
    return datos
}
async function postCampaignData (projectData) {
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/campaign",
        method: "POST",
    }
    //const objPrepare = await prepareData(projectData)
    const readyData =  JSON.stringify(projectData)
    console.log(readyData, "readyData")
    const request = await fetchData(petition.method,petition.backendURLBase,petition.endpoint,encodeURIComponent(readyData))
    return request
}
// añadir update request

async function updateCampaignData (projectData) {

    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/updateCampaign",
        method: "PUT",
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json" // Añadir encabezado Content-Type
        },
         body: JSON.stringify( projectData )
    }
    //onst objPrepare = await prepareData(projectData)
    const request = await fetch(`${petition.backendURLBase}${petition.endpoint}`,requestOptions)
    return request.json()
}
async function deleteCampaign( projectData) {
    const petition = {
        backendURLBase: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/deleteCampaign",
        method: "DELETE",
    };
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ projectData })
    };
    const response = await fetch(`${petition.backendURLBase}${petition.endpoint}`, requestOptions);
    return response;
}
async function getCampaigns (clientId) {
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/campaign",
        method: "GET",
    }
    const request = await fetchData(petition.method,petition.backendURLBase,petition.endpoint,clientId)
    //console.log(request)
    return request
}
async function getCampaignsById (id) {
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/campaignContentId",
        method: "GET",
    }
    const request = await fetchData(petition.method,petition.backendURLBase,petition.endpoint,id)
    console.log(request)
    return request
}
async function deployProject(projectData) {
      const stringifyData = JSON.stringify(projectData)
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashboardServices/deploy-project"
       
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Añadir encabezado Content-Type
        },
        body: stringifyData
    }
    const request = await fetch(`${petition.backendURLBase}${petition.endpoint}`,requestOptions)
    return request
}
async function deployStatus(deployId) {
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashboardServices/deploy-status",
        method: "GET",
    }
    const requestOptions = {
        method: "GET",
    }
    const request = await fetch(`${petition.backendURLBase}${petition.endpoint}?deployId=${deployId}`,requestOptions)
    return request
}

async function updateProjectURL (projectData) {
    const readyData = await JSON.stringify(projectData)
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/update-project-url",
        method: "PUT",
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json" // Añadir encabezado Content-Type
        },
        body: readyData
    }
    console.log(readyData)
    //onst objPrepare = await prepareData(projectData)
    const request = await fetch(`${petition.method,petition.backendURLBase,petition.endpoint}`,requestOptions)
    console.log(request)
}
async function destroyProject(projectData) {
    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashboardServices/delete-project",
        method: "DELETE",
    }
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" // Añadir encabezado Content-Type
        },
        body: JSON.stringify({ projectData })
    }
    const request = await fetch(`${petition.backendURLBase}${petition.endpoint}`,requestOptions)
    return request
}
async function getCountLeads (id) {
        const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/count-leads",
        method: "GET",
    }
    const request = await fetchData(petition.method,petition.backendURLBase,petition.endpoint,id)
    console.log(request)
    return request
} 

async function getCountEmailSent (id) {

    const petition = {
        backendURLBase : process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8080',
        endpoint: "/dashBoardContent/count-email-sent",
        method: "GET",
    }
    const request = await fetchData(petition.method,petition.backendURLBase,petition.endpoint,id)
    console.log(request)
    return request
}

export {
    fetchData, postCampaignData,updateCampaignData,getCampaigns, deployProject, deployStatus, getCampaignsById, updateProjectURL, deleteCampaign,destroyProject,getCountLeads,getCountEmailSent
}

