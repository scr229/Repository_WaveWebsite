// Game state
let gameState = {
    currentScene: 'plane',
    inventory: ['buoyPlaced'],
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
    metalstep: { volume: 0.8 },
    paper: { volume: 0.3 },
    metalsqueak: { volume: 0.5 },
    correct: { volume: 0.7 },
    incorrect: { volume: 0.7 }
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
        hotspots: [
            {
                x: 50,
                y: 79,
                width: 2.7,
                height: 5.5,
                type: 'inspect',
                inspectImage: 'Photos/Render_Phone_Dead_single.png',
                item: null,
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
                y: 69,
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
                y: 91,
                width: 38,
                height: 9,
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
                x: 56,
                y: 74,
                width: 11,
                height: 15,
                next: 'grass',
                item: null,
                condition: () => gameState.inventory.includes('seen'),
                sound: 'step'
            },
            {
                x: 30,
                y: 91,
                width: 38,
                height: 9,
                next: 'intro',
                item: null,
                sound: 'step'
            }
        ]
    },
    ground: {
        title: 'Ground Level',
        images: {
            default: 'Photos/Render_Ground.png',
            stage2: 'Photos/Render_Ground_rain.png',
            stage3: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'
        },
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
                x: 30,
                y: 91,
                width: 38,
                height: 9,
                next: 'front',
                item: null,
                sound: 'step'
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
                y: 91,
                width: 38,
                height: 9,
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
                password: '1234',
                item: 'PowerOn',
                condition: () => gameState.inventory.includes('buoyPlaced') && !gameState.inventory.includes('PowerOn'),
                sound: 'switch'
            },

            {
                x: 30,
                y: 91,
                width: 38,
                height: 9,
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
                y: 91,
                width: 38,
                height: 9,
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
                y: 91,
                width: 38,
                height: 9,
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
                y: 91,
                width: 38,
                height: 9,
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
                y: 91,
                width: 38,
                height: 9,
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
            stage3: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
        },
        hotspots: [
            {
                x: 31,
                y: 0,
                width: 68,
                height: 100,
                next: 'win2',
            }
        ]
    },
    win2: {
        title: 'flood',
        images: {
            default: 'Photos/Render_Storm_Won.png',
            stage2: 'Photos/Render_Waves.png',
            stage3: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
        },
        hotspots: [
            {
                x: 31,
                y: 0,
                width: 68,
                height: 100,
                next: 'winscreen',
            }
        ]
    },
    lose1: {
        title: 'waves',
        images: {
            default: 'Photos/Render_Waves.png',
            stage2: 'Photos/Render_Waves.png',
            stage3: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
        },
        hotspots: [
            {
                x: 31,
                y: 0,
                width: 68,
                height: 100,
                next: 'lose2',
            }
        ]
    },
    lose2: {
        title: 'storm',
        images: {
            default: 'Photos/Render_Storm_Lost.png',
            stage2: 'Photos/Render_Storm_Lost.png',
            stage3: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'
        },
        hotspots: [
            {
                x: 31,
                y: 0,
                width: 68,
                height: 100,
                next: 'losescreen',
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
    }, 300);
}

// Render hotspots for current scene
function renderHotspots(scene) {
    const container = document.getElementById('hotspotsContainer');
    container.innerHTML = '';
    
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

// Handle hotspot click
function makeChoice(hotspot) {
    playSound(hotspot.sound);
    gameState.decisionCount++;
    
    if (gameState.decisionCount === 40 && !gameState.inventory.includes('PowerOn')) {
        loadScene('lose1');
        return;
    }

        if (gameState.decisionCount === 40 && gameState.inventory.includes('PowerOn')) {
        loadScene('win1');
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

// Start the game
function startGame() {
    const titleScreen = document.getElementById('titleScreen');
    const blackScreen = document.getElementById('blackScreen');
    
    initAudio();
    
    titleScreen.classList.add('hidden');
    
    setTimeout(() => {
        blackScreen.classList.add('active');
    }, 500);
    
    setTimeout(() => {
        loadScene('plane');
        blackScreen.classList.remove('active');
        startBackgroundMusic();
    }, 1000);
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