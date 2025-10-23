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

// Image dimensions - all hotspots are positioned relative to this
const IMAGE_WIDTH = 468;
const IMAGE_HEIGHT = 703;

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

// Scene definitions - hotspots in PIXELS relative to 468×703 image
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
                x: 234.00,
                y: 555.37,
                width: 34.56,
                height: 38.66,
                next: 'phoneforest',
                item: 'phone',
                sound: 'switch'
            },
            {
                x: 234.00,
                y: 260.11,
                width: 128.00,
                height: 77.33,
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
                x: -22.00,
                y: 70.30,
                width: 384.00,
                height: 562.40,
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
                x: 323.60,
                y: 474.53,
                width: 38.40,
                height: 28.12,
                type: 'inspect',
                inspectImage: 'Photos/Battery_diagram.png',
                item: null,
                sound: 'paper'
            },
            {
                x: -9.20,
                y: 274.17,
                width: 179.20,
                height: 133.57,
                next: 'front',
                item: null,
                sound: 'step'
            },
            {
                x: 182.80,
                y: 351.50,
                width: 115.20,
                height: 56.24,
                next: 'beach',
                item: null,
                sound: 'step'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                check: () => gameState.inventory.includes('seen') && !gameState.inventory.includes('buoy'),
                images: {
                    default: 'Photos/Render_Front_buoy.png',
                    stage2: 'Photos/Render_Front_buoy_rain.png',
                    stage3: 'Photos/Render_Phone_beach_charge.png'
                }
            }
        ],
        hotspots: [
            {
                x: 118.80,
                y: 386.65,
                width: 192.00,
                height: 140.60,
                next: 'ground',
                item: null,
                sound: 'step'
            },
            {
                x: 272.40,
                y: 492.10,
                width: 204.80,
                height: 133.57,
                next: 'grass',
                item: null,
                condition: () => gameState.inventory.includes('seen'),
                sound: 'step'
            },
            {
                x: -22.00,
                y: 618.64,
                width: 486.40,
                height: 84.36,
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
                x: 125.20,
                y: 379.62,
                width: 128.00,
                height: 130.06,
                next: 'secondfloor',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 42.00,
                y: 323.38,
                width: 64.00,
                height: 28.12,
                type: 'inspect',
                inspectImage: 'Photos/Section_Crumpled.png',
                item: null,
                sound: 'paper'
            },
            {
                x: 80.40,
                y: 386.65,
                width: 19.20,
                height: 35.15,
                next: 'phoneBeach',
                item: null,
                sound: 'switch',
                condition: () => gameState.inventory.includes('phone') && gameState.inventory.includes('PowerOn') && !gameState.inventory.includes('phonecall'),
            },
            {
                x: 80.40,
                y: 386.65,
                width: 19.20,
                height: 35.15,
                item: null,
                sound: 'switch',
                condition: () => !gameState.inventory.includes('phone'),
            },
            {
                x: 80.40,
                y: 386.65,
                width: 19.20,
                height: 35.15,
                next: 'phonecall',
                item: null,
                sound: 'switch',
                condition: () => gameState.inventory.includes('phone') && gameState.inventory.includes('PowerOn') && gameState.inventory.includes('phonecall'),
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: 42.00,
                y: 70.30,
                width: 320.00,
                height: 562.40,
                next: 'phonecall',
                item: 'phonecall',
                sound: 'boop',
                condition: () => gameState.inventory.includes('PowerOn') && !gameState.inventory.includes('phonecall'),
            },
            {
                x: 42.00,
                y: 70.30,
                width: 320.00,
                height: 562.40,
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
                x: 42.00,
                y: 70.30,
                width: 320.00,
                height: 562.40,
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
                x: 42.00,
                y: 323.38,
                width: 256.00,
                height: 147.63,
                next: 'thirdfloor',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 362.00,
                y: 217.93,
                width: 76.80,
                height: 456.95,
                next: 'servers',
                item: null,
                sound: 'metalsqueak'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: 208.40,
                y: 351.50,
                width: 230.40,
                height: 42.18,
                type: 'password',
                password: '5684',
                item: 'PowerOn',
                condition: () => gameState.inventory.includes('buoyPlaced') && !gameState.inventory.includes('PowerOn'),
            },
            {
                x: 208.40,
                y: 351.50,
                width: 230.40,
                height: 42.18,
                type: 'inspect',
                inspectImage: 'Photos/Numberpad.png',
                condition: () => !gameState.inventory.includes('buoyPlaced'),
                sound: 'switch2'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: -9.20,
                y: 428.83,
                width: 179.20,
                height: 119.51,
                next: 'lookout',
                item: null,
                sound: 'metalstep'
            },
            {
                x: 157.20,
                y: 133.57,
                width: 32.00,
                height: 21.09,
                type: 'inspect',
                inspectImage: 'Photos/axo_drawing.png',
                item: null,
                sound: 'paper'
            },
            {
                x: 298.00,
                y: 463.98,
                width: 166.40,
                height: 239.02,
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
                x: 29.20,
                y: 253.08,
                width: 192.00,
                height: 203.87,
                type: 'inspect',
                item: 'seen',
                inspectImage: 'Photos/Render_Buoy_Telescope.png',
                condition: () => !gameState.inventory.includes('buoyPlaced') && !gameState.inventory.includes('buoy'),
                sound: 'metalsqueak'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: 259.60,
                y: 400.71,
                width: 76.80,
                height: 28.12,
                next: 'ocean',
                item: null,
                sound: 'splash'
            },
            {
                x: 144.40,
                y: 478.04,
                width: 76.80,
                height: 28.12,
                type: 'inspect',
                inspectImage: 'Photos/paper_site.png',
                item: 'seen',
                sound: 'paper'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: 93.20,
                y: 182.78,
                width: 166.40,
                height: 330.41,
                next: 'grass',
                item: 'buoy',
                condition: () => !gameState.inventory.includes('buoy'),
                sound: 'metalstep'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
                x: 106.00,
                y: 281.20,
                width: 256.00,
                height: 210.90,
                next: 'ocean',
                item: 'buoyPlaced',
                condition: () => gameState.inventory.includes('buoy') && !gameState.inventory.includes('buoyPlaced'),
                sound: 'splash'
            },
            {
                x: -22.00,
                y: 527.25,
                width: 486.40,
                height: 175.75,
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
            wait: 3000,
            delay: 2000
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
            default: 'Photos/Black_Screen.png',
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
                x: 42.00,
                y: 449.92,
                width: 384.00,
                height: 84.36,
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
                x: 42.00,
                y: 449.92,
                width: 384.00,
                height: 84.36,
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

// Update background music based on decision count
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
    
    const currentSrc = bgMusic.src;
    if (!currentSrc.endsWith(newSrc)) {
        const wasPlaying = !bgMusic.paused;
        bgMusic.src = newSrc;
        bgMusic.currentTime = 0;
        if (wasPlaying) {
            bgMusic.play();
        }
    }
}

function checkMusicStageChange() {
    if (!gameState.audioEnabled) return;
    
    if (gameState.decisionCount === 20) {
        playSound('thunder');
    }
    
    if (gameState.decisionCount === 40) {
        playSound('thunder');
    }
}

// Update hotspots container dimensions to match the displayed image
function updateHotspotsContainer() {
    const img = document.getElementById('gameImage');
    const container = document.getElementById('hotspotsContainer');
    
    if (img && container) {
        container.style.width = img.offsetWidth + 'px';
        container.style.height = img.offsetHeight + 'px';
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
        
        // Wait for image to load before updating hotspots
        img.onload = () => {
            updateHotspotsContainer();
            renderHotspots(scene);
        };
        
        updateInventory();
        updateBackgroundMusic();
    }, 300);
}

// Render hotspots positioned relative to image dimensions
function renderHotspots(scene) {
    const container = document.getElementById('hotspotsContainer');
    container.innerHTML = '';
    
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
        
        // Convert pixel coordinates to percentages relative to IMAGE_WIDTH and IMAGE_HEIGHT
        const leftPercent = (hotspot.x / IMAGE_WIDTH) * 100;
        const topPercent = (hotspot.y / IMAGE_HEIGHT) * 100;
        const widthPercent = (hotspot.width / IMAGE_WIDTH) * 100;
        const heightPercent = (hotspot.height / IMAGE_HEIGHT) * 100;
        
        hotspotDiv.style.left = leftPercent + '%';
        hotspotDiv.style.top = topPercent + '%';
        hotspotDiv.style.width = widthPercent + '%';
        hotspotDiv.style.height = heightPercent + '%';
        
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

// Make a choice and handle game logic
function makeChoice(hotspot) {
    playSound(hotspot.sound);
    gameState.decisionCount++;
    checkMusicStageChange();
    
    if (hotspot.restart) {
        gameState.inventory = [];
        gameState.decisionCount = 0;
    }
    
    if (gameState.decisionCount === 40 && !gameState.inventory.includes('phonecall')) {
        loadSceneWithLongFade('lose1', 2000);
        return;
    }

    if (gameState.decisionCount === 40 && gameState.inventory.includes('phonecall')) {
        loadSceneWithLongFade('win1', 2000);
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

// Start game
function startGame() {
    const titleScreen = document.getElementById('titleScreen');
    const blackScreen = document.getElementById('blackScreen');
    
    initAudio();
    
    titleScreen.classList.add('hidden');
    
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

// Load scene with long fade
function loadSceneWithLongFade(sceneKey, fadeDelay = 2000) {
    gameState.currentScene = sceneKey;
    const scene = scenes[sceneKey];
    
    const img = document.getElementById('gameImage');
    img.classList.add('fade-out');
    
    setTimeout(() => {
        img.src = getSceneImage(scene);
        img.classList.remove('fade-out');
        
        img.onload = () => {
            updateHotspotsContainer();
            renderHotspots(scene);
        };
        
        updateInventory();
        updateBackgroundMusic();
        
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

// Track mouse position for hotspot placement (shows pixel coordinates)
document.addEventListener('mousemove', function(e) {
    const mousePos = document.getElementById('mousePosition');
    if (!mousePos.classList.contains('active')) return;
    
    const img = document.getElementById('gameImage');
    const rect = img.getBoundingClientRect();
    
    // Calculate position relative to the image in pixels
    const pixelX = ((e.clientX - rect.left) / rect.width * IMAGE_WIDTH).toFixed(2);
    const pixelY = ((e.clientY - rect.top) / rect.height * IMAGE_HEIGHT).toFixed(2);
    
    document.getElementById('mouseX').textContent = pixelX + 'px';
    document.getElementById('mouseY').textContent = pixelY + 'px';
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

// Preload images
function preloadImages() {
    const imagesToPreload = [];
    
    Object.values(scenes).forEach(scene => {
        if (scene.images) {
            imagesToPreload.push(scene.images.default);
            if (scene.images.stage2) imagesToPreload.push(scene.images.stage2);
            if (scene.images.stage3) imagesToPreload.push(scene.images.stage3);
        }
        
        if (scene.conditionalImages) {
            scene.conditionalImages.forEach(condImg => {
                if (condImg.images) {
                    imagesToPreload.push(condImg.images.default);
                    if (condImg.images.stage2) imagesToPreload.push(condImg.images.stage2);
                    if (condImg.images.stage3) imagesToPreload.push(condImg.images.stage3);
                }
            });
        }
        
        if (scene.hotspots) {
            scene.hotspots.forEach(hotspot => {
                if (hotspot.inspectImage) {
                    imagesToPreload.push(hotspot.inspectImage);
                }
            });
        }
    });
    
    const uniqueImages = [...new Set(imagesToPreload)];
    
    uniqueImages.forEach(src => {
        if (src && !src.startsWith('http')) {
            const img = new Image();
            img.src = src;
        }
    });
}

// Update hotspots container on window resize
window.addEventListener('resize', () => {
    updateHotspotsContainer();
});