nuiLoaded = false

function checkNUI()
    while not nuiLoaded do
        Wait(0)
    end
end

function NuiMessage(action, payload)
    checkNUI()
    SendNUIMessage({
        action = action,
        payload = payload
    })
end

CreateThread(function()
    while not nuiLoaded do
        if NetworkIsSessionStarted() then
            SendNUIMessage({
                action = "CHECK_NUI",
            })
        end
        Wait(2000)
    end
end)

RegisterNUICallback("checkNUI", function(data, cb)
    nuiLoaded = true
    cb("ok")
end)

function OpenTextUI(message, key, thema)
    checkNUI()
    local textUI = {
        message = message,
        key = key,
        thema = thema
    }
    NuiMessage("SHOW_TEXTUI", textUI)
end

function CloseTextUI()
    NuiMessage("CLOSE_TEXTUI")
end

RegisterNetEvent('codem-textui:ShowTextUI', function(message, key, thema)
    OpenTextUI(message, key, thema)
end)

RegisterNetEvent('codem-textui:CloseTextUI', function()
    CloseTextUI()
end)
