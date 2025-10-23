// Game state
let gameState = {
    currentScene: 'plane',
    inventory: [''],
    decisionCount: 0,
    audioEnabled: true,
    passwordInput: ''
};

// Audio elements
let bgMusic;
let soundEffects = {};

// Sound effect configuration
const soundConfig = {
    step: { volume: 0.5 },
    item: { volume: 0.6 },
    door: { volume: 0.7 },
    splash: { volume: 0.4 },
    switch: { volume: 0.8 },
    flip: { volume: 0.8 },
    metalstep: { volume: 0.8 },
    paper: { volume: 0.3 },
    metalsqueak: { volume: 0.5 },
    correct: { volume: 0.5 },
    incorrect: { volume: 0.7 },
    boop: { volume: 0.6 },
    thunder: { volume: 0.2 }
};

// Scene definitions - Copy all your scenes from your file
const scenes = {
    plane: {
        title: 'Crash Site',
        images: {
            default: 'Photos/Render_plane.png',
            stage2: 'Photos/Render_plane.png',
            stage3: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('phone'),
                images: {
                    default: 'Photos/Render_plane_gone.png',
                    stage2: 'Photos/Render_plane_gone.png',
                    stage3: 'Photos/Render_plane_gone.png'
                }
            }
        ],
        hotspots: [
            {
                x: 50,
                y: 79,
                width: 2.7,
                height: 5.5,
                next: 'phoneforest',
                item: 'phone',
                sound: 'switch'
            },
            {
                x: 50,
                y: 37,
                width: 10,
                height: 11,
                next: 'intro',
                item: null,
                sound: 'step'
            }
        ]
    },
    phoneforest: {
        title: 'phone forest',
        images: {
            default: 'Photos/Render_Phone_forest.png',
            stage2: 'Photos/Render_Phone_forest.png',
            stage3: 'Photos/Render_Phone_forest.png'
        },
        hotspots: [
            {
                x: 30,
                y: 10,
                width: 30,
                height: 80,
                next: 'plane',
                item: null,
                sound: 'switch'
            }
        ]
    },
    intro: {
        title: 'Approach',
        images: {
            default: 'Photos/Render_Approach.png',
            stage2: 'Photos/Render_Approach_rain.png',
            stage3: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800'
        },
        hotspots: [
            {
                x: 57,
                y: 67.5,
                width: 3,
                height: 4,
                type: 'inspect',
                inspectImage: 'Photos/Battery_diagram.png',
                item: null,
                sound: 'paper'
            },
            {
                x: 31,
                y: 39,
                width: 14,
                height: 19,
                next: 'front',
                item: null,
                sound: 'step'
            },
            {
                x: 46,
                y: 50,
                width: 9,
                height: 8,
                next: 'beach',
                item: null,
                sound: 'step'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'plane',
                item: null,
                sound: 'step'
            }
        ]
    },
    front: {
        title: 'Front',
        images: {
            default: 'Photos/Render_Front.png',
            stage2: 'Photos/Render_Front_Rain.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('seen'),
                images: {
                    default: 'Photos/Render_Front_buoy.png',
                    stage2: 'Photos/Render_Front_buoy_rain.png',
                    stage3: 'Photos/Render_Phone_beach_charge.png'
                }
            }
        ],
        hotspots: [
            {
                x: 41,
                y: 55,
                width: 15,
                height: 20,
                next: 'ground',
                item: null,
                sound: 'step'
            },
            {
                x: 53,
                y: 70,
                width: 16,
                height: 19,
                next: 'grass',
                item: null,
                condition: () => gameState.inventory.includes('seen'),
                sound: 'step'
            },
            {
                x: 30,
                y: 88,
                width: 38,
                height: 12,
                next: 'intro',
                item: null,
                sound: 'step'
            }
        ]
    },
    ground: {
        title: 'Ground Level',
        images: {
            default: 'Photos/Render_Ground_off.png',
            stage2: 'Photos/Render_Ground_off_rain.png',
            stage3: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('PowerOn'),
                images: {
                    default: 'Photos/Render_Ground_on.png',
                    stage2: 'Photos/Render_Ground_on_rain.png',
                    stage3: 'Photos/Render_Phone_beach_charge.png'
                }
            }
        ],
        hotspots: [
            {
                x: 41.5,
                y: 54,
                width: 10,
                height: 18.5,
                next: 'secondfloor',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 35,
                y: 46,
                width: 5,
                height: 4,
                type: 'inspect',
                inspectImage: 'Photos/Section_Crumpled.png',
                item: null,
                sound: 'paper'
            },
            {
                x: 38,
                y: 55,
                width: 1.5,
                height: 5,
                next: 'phoneBeach',
                item: null,
                sound: 'switch',
                condition: () => gameState.inventory.includes('phone') && gameState.inventory.includes('PowerOn') && !gameState.inventory.includes('phonecall'),
            },
            {
                x: 38,
                y: 55,
                width: 1.5,
                height: 5,
                item: null,
                sound: 'switch',
                condition: () => !gameState.inventory.includes('phone'),
            },
                        {
                x: 38,
                y: 55,
                width: 1.5,
                height: 5,
                next: 'phonecall',
                item: null,
                sound: 'switch',
                condition: () => gameState.inventory.includes('phone') && gameState.inventory.includes('PowerOn') && gameState.inventory.includes('phonecall'),
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'front',
                item: null,
                sound: 'step'
            }
        ]
    },
    phoneBeach: {
        title: 'phoneBeach',
        images: {
            default: 'Photos/Render_Phone_beach_dead.png',
            stage2: 'Photos/Render_Phone_beach_dead.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('PowerOn'),
                images: {
                    default: 'Photos/Render_Phone_beach_charge.png',
                    stage2: 'Photos/Render_Phone_beach_charge.png',
                    stage3: 'Photos/Render_Phone_beach_charge.png'
                }
            }
        ],
        hotspots: [
            {
                x: 35,
                y: 10,
                width: 25,
                height: 80,
                next: 'phonecall',
                item: 'phonecall',
                sound: 'boop',
                condition: () => gameState.inventory.includes('PowerOn') && !gameState.inventory.includes('phonecall'),
            },
            {
                x: 35,
                y: 10,
                width: 25,
                height: 80,
                next: 'ground',
                item: null,
                sound: 'switch',
                condition: () => !gameState.inventory.includes('PowerOn') && !gameState.inventory.includes('phonecall'),
            }
        ]
    },
    phonecall: {
        title: 'phonecall',
        images: {
            default: 'Photos/Render_Phone_beach_call.png',
            stage2: 'Photos/Render_Phone_beach_call.png',
            stage3: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800'
        },
        hotspots: [
            {
                x: 35,
                y: 10,
                width: 25,
                height: 80,
                next: 'ground',
                item: null,
                sound: 'switch'
            }
        ]
    },
    secondfloor: {
        title: 'Second Floor',
        images: {
            default: 'Photos/Render_2nd_Off.png',
            stage2: 'Photos/Render_2nd_Off_rain.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('PowerOn'),
                images: {
                    default: 'Photos/Render_2nd_On.png',
                    stage2: 'Photos/Render_2nd_On_rain.png',
                    stage3: 'Photos/Render_2nd_On.png'
                }
            }
        ],
        hotspots: [
            {
                x: 35,
                y: 46,
                width: 20,
                height: 21,
                next: 'thirdfloor',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 60,
                y: 31,
                width: 6,
                height: 65,
                next: 'servers',
                item: null,
                sound: 'metalsqueak'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'ground',
                item: null,
                sound: 'metalstep'
            }
        ]
    },
    servers: {
        title: 'Battery Room',
        images: {
            default: 'Photos/Render_Servers_Off.png',
            stage2: 'Photos/Render_Servers_Off.png',
            stage3: 'Photos/Render_Servers_Off.png'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('PowerOn'),
                images: {
                    default: 'Photos/Render_Servers_On.png',
                    stage2: 'Photos/Render_Servers_On.png',
                    stage3: 'Photos/Render_Servers_On.png'
                }
            }
        ],
        hotspots: [
            {
                x: 48,
                y: 50,
                width: 18,
                height: 6,
                type: 'password',
                password: '5684',
                item: 'PowerOn',
                condition: () => gameState.inventory.includes('buoyPlaced') && !gameState.inventory.includes('PowerOn'),
            },

            {
                x: 48,
                y: 50,
                width: 18,
                height: 6,
                type: 'inspect',
                inspectImage: 'Photos/Numberpad.png',
                condition: () => !gameState.inventory.includes('buoyPlaced'),
                sound: 'switch2'
            },

            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'secondfloor',
                item: null,
                sound: 'metalstep'
            }
        ]
    },
    thirdfloor: {
        title: 'Third Floor',
        images: {
            default: 'Photos/Render_3rd.png',
            stage2: 'Photos/Render_3rd_rain.png',
            stage3: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800'
        },
        hotspots: [
            {
                x: 31,
                y: 61,
                width: 14,
                height: 17,
                next: 'lookout',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 44,
                y: 19,
                width: 2.5,
                height: 3,
                type: 'inspect',
                inspectImage: 'Photos/axo_drawing.png',
                item: null,
                sound: 'paper'
            },
            {
                x: 55,
                y: 66,
                width: 13,
                height: 34,
                next: 'secondfloor',
                item: null,
                sound: 'metalstep'
            }
        ]
    },
    lookout: {
        title: 'Lookout',
        images: {
            default: 'Photos/Render_Lookout_gone.png',
            stage2: 'Photos/Render_Lookout_gone.png',
            stage3: 'Photos/Render_Lookout_gone.png'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('buoyPlaced'),
                images: {
                    default: 'Photos/Render_Lookout.png',
                    stage2: 'Photos/Render_Lookout.png',
                    stage3: 'Photos/Render_Lookout.png'
                }
            }
        ],
        hotspots: [
            {
                x: 34,
                y: 36,
                width: 15,
                height: 29,
                type: 'inspect',
                item: 'seen',
                inspectImage: 'Photos/Render_Buoy_Telescope.png',
                condition: () => !gameState.inventory.includes('buoyPlaced') && !gameState.inventory.includes('buoy'),
                sound: 'metalsqueak'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'thirdfloor',
                item: null,
                sound: 'metalstep'
            }
        ]
    },
    beach: {
        title: 'Beach',
        images: {
            default: 'Photos/Render_Beach.png',
            stage2: 'Photos/Render_Beach_rain.png',
            stage3: 'https://images.unsplash.com/photo-1610375229632-c4a8e1ec07fa?w=800'
        },
        hotspots: [
            {
                x: 52,
                y: 57,
                width: 6,
                height: 4,
                next: 'ocean',
                item: null,
                sound: 'splash'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'intro',
                item: null,
                sound: 'step'
            }
        ]
    },
    grass: {
        title: 'Grass',
        images: {
            default: 'Photos/Render_Buoy_Grass.png',
            stage2: 'Photos/Render_Buoy_Grass_rain.png',
            stage3: 'Photos/Render_Buoy_Grass.png'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('buoy'),
                images: {
                    default: 'Photos/Render_Buoy_Grass_none.png',
                    stage2: 'Photos/Render_Buoy_Grass_none_rain.png',
                    stage3: 'Photos/Render_Buoy_Grass_none.png'
                }
            }
        ],
        hotspots: [
            {
                x: 39,
                y: 26,
                width: 13,
                height: 47,
                next: 'grass',
                item: 'buoy',
                condition: () => !gameState.inventory.includes('buoy'),
                sound: 'metalstep'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'front',
                item: null,
                sound: 'step'
            }
        ]
    },
    ocean: {
        title: 'Ocean',
        images: {
            default: 'Photos/Render_Buoy_none.png',
            stage2: 'Photos/Render_Buoy_none_rain.png',
            stage3: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
        },
        conditionalImages: [
            {
                check: () => gameState.inventory.includes('buoyPlaced'),
                images: {
                    default: 'Photos/Render_Buoy.png',
                    stage2: 'Photos/Render_Buoy_rain.png',
                    stage3: 'Photos/Render_Buoy.png'
                }
            }
        ],
        hotspots: [
            {
                x: 40,
                y: 40,
                width: 20,
                height: 30,
                next: 'ocean',
                item: 'buoyPlaced',
                condition: () => gameState.inventory.includes('buoy') && !gameState.inventory.includes('buoyPlaced'),
                sound: 'splash'
            },
            {
                x: 30,
                y: 75,
                width: 38,
                height: 25,
                next: 'beach',
                item: null,
                sound: 'splash'
            }
        ]
    },
    win1: {
        title: 'waves',
        images: {
            default: 'Photos/Render_Waves.png',
            stage2: 'Photos/Render_Waves.png',
            stage3: 'Photos/Render_Waves.png'
        },
        autoAdvance: {
            next: 'win2',
            wait: 3000,      // How long to show this scene
            delay: 2000      // Fade transition duration
        },
        hotspots: []
    },
    win2: {
        title: 'flood',
        images: {
            default: 'Photos/Render_Storm_Won.png',
            stage2: 'Photos/Render_Storm_Won.png',
            stage3: 'Photos/Render_Storm_Won.png'
        },
        autoAdvance: {
            next: 'winscreen',
            wait: 3000,
            delay: 2000
        },
        hotspots: []
    },
    lose1: {
        title: 'waves',
        images: {
            default: 'Photos/Render_Waves.png',
            stage2: 'Photos/Render_Waves.png',
            stage3: 'Photos/Render_Waves.png'
        },
        autoAdvance: {
            next: 'lose2',
            wait: 4000,
            delay: 2000
        },
        hotspots: []
    },
    lose2: {
        title: 'storm',
        images: {
            default: 'Photos/Render_Storm_Lost.png',
            stage2: 'Photos/Render_Storm_Lost.png',
            stage3: 'Photos/Render_Storm_Lost.png'
        },
        autoAdvance: {
            next: 'losescreen',
            wait: 4000,
            delay: 2000
        },
        hotspots: []
    },
    winscreen: {
    title: 'Victory',
    images: {
        default: 'Photos/Black_Screen.png',  // Just a black image
        stage2: 'Photos/Black_Screen.png',
        stage3: 'Photos/Black_Screen.png'
    },
    endingText: {
        title: 'Survival',
        message: 'You successfully contact help and flee the oncoming storm.',
        buttonText: 'Start Again'
    },
    hotspots: [
        {
            x: 35,
            y: 64,
            width: 30,
            height: 12,
            next: 'plane',
            item: null,
            sound: 'switch',
            restart: true
        }
    ]
    },
    losescreen: {
        title: 'Defeat',
        images: {
            default: 'Photos/Black_Screen.png',
            stage2: 'Photos/Black_Screen.png',
            stage3: 'Photos/Black_Screen.png'
        },
        endingText: {
            title: 'Perished',
            message: 'Unable to contact help, you succumb to the storm.',
            buttonText: 'Try Again'
        },
        hotspots: [
            {
                x: 35,
                y: 64,
                width: 30,
                height: 12,
                next: 'plane',
                item: null,
                sound: 'switch',
                restart: true
            }
        ]
    }
};

// Get the correct image based on decision count AND inventory
function getSceneImage(scene) {
    let imageStage;
    
    if (gameState.decisionCount >= 100) {
        imageStage = 'stage3';
    } else if (gameState.decisionCount >= 20) {
        imageStage = 'stage2';
    } else {
        imageStage = 'default';
    }
    
    if (scene.conditionalImages) {
        for (let condition of scene.conditionalImages) {
            if (condition.check()) {
                return condition.images[imageStage] || condition.images.default;
            }
        }
    }
    
    return scene.images[imageStage];
}

// Add this new function after the getSceneImage function
function updateBackgroundMusic() {
    if (!gameState.audioEnabled || !bgMusic) return;
    
    let newSrc;
    
    if (gameState.decisionCount >= 100) {
        newSrc = 'Audio/rain_heavy.mp3';
    } else if (gameState.decisionCount >= 20) {
        newSrc = 'Audio/rain_approaching.mp3';
    } else {
        newSrc = 'Audio/Background_waves.mp3';
    }
    
    // Only change if the track is actually different
    const currentSrc = bgMusic.src;
    if (!currentSrc.endsWith(newSrc)) {
        const currentTime = bgMusic.currentTime; // Save current position
        const wasPlaying = !bgMusic.paused;
        
        bgMusic.src = newSrc;
        bgMusic.currentTime = 0; // Start new track from beginning
        
        if (wasPlaying) {
            bgMusic.play();
        }
    }
    // If same track, do nothing - let it continue playing
}

function checkMusicStageChange() {
    if (!gameState.audioEnabled) return;
    
    // Check if we just hit stage 2 (decision count is exactly 20)
    if (gameState.decisionCount === 20) {
        playSound('thunder'); // Or whatever sound you want
    }
    
    // Optional: Check for stage 3
    if (gameState.decisionCount === 40) {
        playSound('thunder');
    }
}

// Load a scene
function loadScene(sceneKey) {
    gameState.currentScene = sceneKey;
    const scene = scenes[sceneKey];
    
    const img = document.getElementById('gameImage');
    img.classList.add('fade-out');
    
    setTimeout(() => {
        img.src = getSceneImage(scene);
        img.classList.remove('fade-out');
        renderHotspots(scene);
        updateInventory();
        updateBackgroundMusic();
    }, 300);
}

// Update the renderHotspots function to show ending text:
function renderHotspots(scene) {
    const container = document.getElementById('hotspotsContainer');
    container.innerHTML = '';
    
    // Check if this scene has ending text
    if (scene.endingText) {
        const textOverlay = document.createElement('div');
        textOverlay.className = 'ending-text-overlay';
        textOverlay.innerHTML = `
            <div class="ending-title">${scene.endingText.title}</div>
            <div class="ending-message">${scene.endingText.message}</div>
            <div class="ending-button">${scene.endingText.buttonText}</div>
        `;
        container.appendChild(textOverlay);
    }
    
    if (!scene.hotspots) return;
    
    scene.hotspots.forEach((hotspot, index) => {
        if (hotspot.condition && !hotspot.condition()) {
            return;
        }
        
        const hotspotDiv = document.createElement('div');
        hotspotDiv.className = 'hotspot';
        hotspotDiv.style.left = hotspot.x + '%';
        hotspotDiv.style.top = hotspot.y + '%';
        hotspotDiv.style.width = hotspot.width + '%';
        hotspotDiv.style.height = hotspot.height + '%';
        
        hotspotDiv.onclick = () => {
            if (hotspot.type === 'inspect') {
                openOverlay(hotspot.inspectImage);
                playSound(hotspot.sound);
                if (hotspot.item && !gameState.inventory.includes(hotspot.item)) {
                    gameState.inventory.push(hotspot.item);
                    updateInventory();
                }
            } else if (hotspot.type === 'password') {
                openPasswordPrompt(hotspot);
            } else {
                makeChoice(hotspot);
            }
        };
        
        container.appendChild(hotspotDiv);
    });
}



// Update makeChoice to handle restart and use long fade for endings:
function makeChoice(hotspot) {
    playSound(hotspot.sound);
    gameState.decisionCount++;
    checkMusicStageChange();
    
    // Check for restart flag
    if (hotspot.restart) {
        // Reset game state
        gameState.inventory = [];
        gameState.decisionCount = 0;
    }
    
    if (gameState.decisionCount === 40 && !gameState.inventory.includes('phonecall')) {
        loadSceneWithLongFade('lose1', 2000);  // Use long fade for endings
        return;
    }

    if (gameState.decisionCount === 40 && gameState.inventory.includes('phonecall')) {
        loadSceneWithLongFade('win1', 2000);   // Use long fade for endings
        return;
    }
    
    if (hotspot.item && !gameState.inventory.includes(hotspot.item)) {
        gameState.inventory.push(hotspot.item);
    }
    
    loadScene(hotspot.next);
}

// Password Number Pad Functions
function openPasswordPrompt(hotspot) {
    const passwordOverlay = document.getElementById('passwordOverlay');
    const passwordDisplay = document.getElementById('passwordDisplay');
    
    gameState.passwordInput = '';
    passwordDisplay.textContent = '----';
    passwordDisplay.classList.remove('shake', 'success');
    passwordOverlay.classList.add('active');
    
    window.currentPasswordHotspot = hotspot;
}

function addDigit(digit) {
    if (gameState.passwordInput.length < 4) {
        gameState.passwordInput += digit;
        updatePasswordDisplay();
        playSound('switch');
        
        // Auto-check when 4 digits entered
        if (gameState.passwordInput.length === 4) {
            setTimeout(() => {
                checkPassword();
            }, 200);
        }
    }
}

function clearPassword() {
    gameState.passwordInput = '';
    updatePasswordDisplay();
    playSound('switch');
}

function updatePasswordDisplay() {
    const display = document.getElementById('passwordDisplay');
    const password = gameState.passwordInput;
    const remaining = 4 - password.length;
    display.textContent = password + '-'.repeat(remaining);
}

function checkPassword() {
    const hotspot = window.currentPasswordHotspot;
    const display = document.getElementById('passwordDisplay');
    
    if (gameState.passwordInput === hotspot.password) {
        // Correct password
        display.classList.add('success');
        playSound('correct');
        playSound('boop');
        
        setTimeout(() => {
            closePasswordPrompt();
            
            if (hotspot.item && !gameState.inventory.includes(hotspot.item)) {
                gameState.inventory.push(hotspot.item);
            }
            
            loadScene(gameState.currentScene);
        }, 800);
    } else {
        // Wrong password
        display.classList.add('shake');
        playSound('incorrect');
        
        setTimeout(() => {
            display.classList.remove('shake');
            clearPassword();
        }, 500);
    }
}

function closePasswordPrompt() {
    const passwordOverlay = document.getElementById('passwordOverlay');
    passwordOverlay.classList.remove('active');
    gameState.passwordInput = '';
    playSound('switch');
}

// Play sound effect
function playSound(soundType) {
    if (!gameState.audioEnabled || !soundType) return;
    
    const sound = soundEffects[soundType];
    
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Initialize audio
function initAudio() {
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) bgMusic.volume = 0.3;
    
    Object.keys(soundConfig).forEach(soundName => {
        const audioElement = document.getElementById(soundName + 'Sound');
        if (audioElement) {
            soundEffects[soundName] = audioElement;
            audioElement.volume = soundConfig[soundName].volume;
        }
    });
}

// Start background music
function startBackgroundMusic() {
    if (!gameState.audioEnabled) return;
    
    if (bgMusic) {
        bgMusic.play().catch(e => {
            console.log('Background music autoplay prevented:', e);
        });
    }
}

// Toggle audio on/off
function toggleAudio() {
    gameState.audioEnabled = !gameState.audioEnabled;
    const button = document.getElementById('audioToggle');
    
    if (gameState.audioEnabled) {
        button.textContent = '🔊';
        button.classList.remove('muted');
        if (bgMusic) bgMusic.play();
    } else {
        button.textContent = '🔇';
        button.classList.add('muted');
        if (bgMusic) bgMusic.pause();
    }
}

// Open overlay with close-up image
function openOverlay(imageSrc) {
    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    overlayImage.src = imageSrc;
    overlay.classList.add('active');
}

// Close overlay and return to scene
function closeOverlay() {
    const overlay = document.getElementById('imageOverlay');
    overlay.classList.remove('active');
}

// Update inventory display
function updateInventory() {
    const inventoryItems = document.getElementById('inventoryItems');
    const decisionCount = document.getElementById('decisionCount');
    
    if (gameState.inventory.length === 0 || (gameState.inventory.length === 1 && gameState.inventory[0] === '')) {
        inventoryItems.textContent = 'Empty';
    } else {
        inventoryItems.textContent = gameState.inventory.filter(item => item !== '').join(', ');
    }
    
    decisionCount.textContent = gameState.decisionCount;
}

// Update the startGame function:
function startGame() {
    const titleScreen = document.getElementById('titleScreen');
    const blackScreen = document.getElementById('blackScreen');
    
    initAudio();
    
    titleScreen.classList.add('hidden');
    
    // Start preloading images
    preloadImages();
    
    setTimeout(() => {
        blackScreen.classList.add('active');
    }, 500);
    
    setTimeout(() => {
        loadScene('plane');
        blackScreen.classList.remove('active');
        startBackgroundMusic();
    }, 2000);
}

// Add this new function for longer fade transitions
function loadSceneWithLongFade(sceneKey, fadeDelay = 2000) {
    gameState.currentScene = sceneKey;
    const scene = scenes[sceneKey];
    
    const img = document.getElementById('gameImage');
    img.classList.add('fade-out');
    
    setTimeout(() => {
        img.src = getSceneImage(scene);
        img.classList.remove('fade-out');
        renderHotspots(scene);
        updateInventory();
        updateBackgroundMusic();
        
        // Auto-advance to next scene if specified
        if (scene.autoAdvance) {
            setTimeout(() => {
                loadSceneWithLongFade(scene.autoAdvance.next, scene.autoAdvance.delay || 2000);
            }, scene.autoAdvance.wait || 3000);
        }
    }, fadeDelay);
}

// Debug mode toggle
function toggleDebugMode() {
    const container = document.getElementById('gameContainer');
    const mousePos = document.getElementById('mousePosition');
    
    container.classList.toggle('debug-mode');
    mousePos.classList.toggle('active');
}

// Track mouse position for hotspot placement
document.addEventListener('mousemove', function(e) {
    const mousePos = document.getElementById('mousePosition');
    if (!mousePos.classList.contains('active')) return;
    
    const container = document.getElementById('gameContainer');
    const rect = container.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    
    document.getElementById('mouseX').textContent = x;
    document.getElementById('mouseY').textContent = y;
});

// Click to copy coordinates
document.getElementById('mousePosition').addEventListener('click', function(e) {
    e.stopPropagation();
    const x = document.getElementById('mouseX').textContent;
    const y = document.getElementById('mouseY').textContent;
    const text = `x: ${x}, y: ${y}`;
    
    navigator.clipboard.writeText(text).then(() => {
        const hint = this.querySelector('div:last-child');
        hint.textContent = 'Copied!';
        setTimeout(() => {
            hint.textContent = 'Click to copy';
        }, 1000);
    });
});

// Add this function to preload images
function preloadImages() {
    const imagesToPreload = [];
    
    // Collect all image URLs from scenes
    Object.values(scenes).forEach(scene => {
        // Add default images
        if (scene.images) {
            imagesToPreload.push(scene.images.default);
            if (scene.images.stage2) imagesToPreload.push(scene.images.stage2);
            if (scene.images.stage3) imagesToPreload.push(scene.images.stage3);
        }
        
        // Add conditional images
        if (scene.conditionalImages) {
            scene.conditionalImages.forEach(condImg => {
                if (condImg.images) {
                    imagesToPreload.push(condImg.images.default);
                    if (condImg.images.stage2) imagesToPreload.push(condImg.images.stage2);
                    if (condImg.images.stage3) imagesToPreload.push(condImg.images.stage3);
                }
            });
        }
        
        // Add inspect images
        if (scene.hotspots) {
            scene.hotspots.forEach(hotspot => {
                if (hotspot.inspectImage) {
                    imagesToPreload.push(hotspot.inspectImage);
                }
            });
        }
    });
    
    // Remove duplicates
    const uniqueImages = [...new Set(imagesToPreload)];
    
    // Preload each image
    uniqueImages.forEach(src => {
        if (src && !src.startsWith('http')) { // Only preload local images
            const img = new Image();
            img.src = src;
        }
    });
}

