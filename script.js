// Game state
let gameState = {
    currentScene: 'intro',
    inventory: [''],
    decisionCount: 0
};

// Scene definitions
const scenes = {
    intro: {
        title: 'The Beginning',
        images: {
            default: 'Photos/Render_Approach.png',
            stage2: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
            stage3: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800'
        },
        description: 'You wake up in a mysterious forest. The morning sun filters through ancient trees. A path splits in two directions ahead.',
        choices: [
            { text: '▲ Approach', next: 'front' }
        ]
    },
    front: {
        title: 'Front',
        images: {
            default: 'Photos/Render_Front.png',
            stage2: 'Photos/Render_Front_Rain.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        description: 'The trees grow thick and the light dims. You hear rustling in the bushes. A glint of metal catches your eye on the ground.',
        choices: [
            { text: '▲ Get closer', next: 'ground', item: 'Ancient Sword' },
            { text: '◀ Go to the beach', next: 'beach' }
        ]
    },
    ground: {
        title: 'Mountain Path',
        images: {
            default: 'Photos/Render_Ground_rain.png',
            stage2: 'Photos/Render_Ground.png',
            stage3: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'
        },
        description: 'The path winds upward. The air grows crisp and clean. In the distance, you see a village with smoke rising from chimneys.',
        choices: [
            { text: '▲ Go upstairs', next: 'secondfloor' },
            { text: '◀ Read paper', next: 'paper', item: 'seen' },
            { text: '▼ Step Back', next: 'front' }
        ]
    },
    paper: {
        title: 'Mountain Path',
        images: {
            default: 'Photos/Paper.png',
            stage2: 'Photos/Paper.png',
            stage3: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'
        },
        description: 'The path winds upward. The air grows crisp and clean. In the distance, you see a village with smoke rising from chimneys.',
        choices: [
            { text: '▼ Put back', next: 'ground' }
        ]
    },
    secondfloor: {
        title: 'Found Treasure',
        images: {
            default: gameState.inventory.includes('PowerOn') 
                ? 'Photos/Render_2nd_On.png'
                : 'Photos/Render_2nd_Off.png',
            stage2: gameState.inventory.includes('PowerOn') 
                ? 'Photos/Render_2nd_On_rain.png'
                : 'Photos/Render_2nd_Off_rain.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        description: 'You pick up an ancient sword! It feels powerful in your hands. The path continues deeper into the woods.',
        choices: [
            { text: '▲ Go upstairs', next: 'thirdfloor' },
            { text: '▶ Check Batteries', next: 'servers' },
            { text: '▼ Go Downstairs', next: 'ground' }
        ]
    },
    servers: {
        title: 'Found Treasure',
        images: {
            default: gameState.inventory.includes('PowerOn') 
                ? 'Photos/Render_Servers_On.png'
                : 'Photos/Render_Servers_Off.png',
            stage2: gameState.inventory.includes('PowerOn') 
                ? 'Photos/Render_Servers_On.png'
                : 'Photos/Render_Servers_Off.png',
            stage3: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800'
        },
        description: 'You pick up an ancient sword! It feels powerful in your hands. The path continues deeper into the woods.',
        choices: [
            { text: '◆ Flip switch',next: 'servers', item: gameState.inventory.includes('BuoyPlaced') 
                                            ? 'powerOn'
                                            : '', },
            { text: '▼ Step back', next: 'secondfloor' }
        ]
    },
    thirdfloor: {
        title: 'Mysterious Cave',
        images: {
            default: 'Photos/Render_3rd.png',
            stage2: 'Photos/Render_3rd_rain.png',
            stage3: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800'
        },
        description: gameState.inventory.includes('Ancient Sword') 
            ? 'You enter the cave with your sword drawn. A dragon sleeps inside! With your weapon, you feel confident.'
            : 'You enter a dark cave. A dragon sleeps inside! Without a weapon, this seems dangerous.',
        choices: [
            { text: '◀ Check Lookout', next: 'lookout' },
            { text: '▼ Go Downstairs', next: 'secondfloor' }
        ]
    },
    lookout: {
        title: 'Peaceful Village',
        images: {
            default: gameState.inventory.includes('BuoyPlaced') 
                    ? 'Photos/Render_Lookout.png'
                    : 'Photos/Render_Lookout_gone.png',
            stage2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            stage3: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800'
        },
        description: 'Friendly villagers greet you warmly. They offer you food and shelter. This could be a good place to rest.',
        choices: [
            { text:'▲ Look', next: 'telescope', item: 'seen', condition: () => !gameState.inventory.includes('buoy') },
            { text: '▼ Step back', next: 'thirdfloor' }
        ]
    },
    telescope: {
        title: 'Dragon Encounter',
        images: {
            default: 'Photos/Render_Buoy_Telescope.png',
            stage2: 'Photos/Render_Buoy_Telescope.png',
            stage3: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
        },
        description: gameState.inventory.includes('Ancient Sword')
            ? 'With your ancient sword, you face the dragon bravely! After an epic battle, the dragon respects your courage and becomes your ally.'
            : 'Without a weapon, you barely escape with your life! The dragon roars as you flee.',
        choices: [
            { text: '▼ Step back', next: 'lookout' }
        ]
    },
    beach: {
        title: 'Hidden Treasure',
        images: {
            default: 'Photos/Render_Beach.png',
            stage2: 'Photos/Render_Beach_rain.png',
            stage3: 'https://images.unsplash.com/photo-1610375229632-c4a8e1ec07fa?w=800'
        },
        description: 'You sneak past the sleeping dragon and find an enormous treasure hoard! Gold and jewels sparkle in the dim light.',
        choices: [
            { text: '▲ Take boat', next: 'ocean' },
            { text: '▶Check grass', condition: () => gameState.inventory.includes('seen')  },
            { text: '▼ Back to machine', next: 'front' }
        ]
    },
    grass: {
        title: 'Peaceful Ending',
        images: {
            default: gameState.inventory.includes('Buoy') 
                    ? 'Photos/Render_Buoy_Grass_none.png'
                    : 'Photos/Render_Buoy_Grass.png', 
            stage2: gameState.inventory.includes('Buoy') 
                    ? 'Photos/Render_Buoy_Grass_none_rain.png'
                    : 'Photos/Render_Buoy_Grass_rain.png', 
            stage3: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800'
        },
        description: 'You settle down in the village and live a peaceful life. Sometimes the greatest adventure is finding home. THE END',
        choices: [
            { text: gameState.inventory.includes('Buoy') 
                    ? ''
                    : 'Take', next: 'grass', 
                item: 'Buoy' },
            { text: '▼ Back to beach', next: 'beach' }
        ]
    },
    endingExplorer: {
        title: 'Explorer Ending',
        images: {
            default: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
            stage2: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            stage3: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
        },
        description: 'You conquered the highest peak! Your name will be remembered as a legendary explorer. THE END',
        choices: [
            { text: 'Start Over', next: 'intro' }
        ]
    },
    endingDragon: {
        title: 'Dragon Rider Ending',
        images: {
            default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
            stage2: 'https://images.unsplash.com/photo-1582747652673-519e8c485785?w=800',
            stage3: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
        },
        description: 'With a dragon as your companion, you soar through the skies! Together you protect the realm. THE END',
        choices: [
            { text: 'Start Over', next: 'intro' }
        ]
    },
    endingRich: {
        title: 'Wealthy Ending',
        images: {
            default: 'https://images.unsplash.com/photo-1611557966610-0e5ef0f15c1f?w=800',
            stage2: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
            stage3: 'https://images.unsplash.com/photo-1610375229632-c4a8e1ec07fa?w=800'
        },
        description: 'You escape with the treasure and live in luxury for the rest of your days! THE END',
        choices: [
            { text: 'Start Over', next: 'intro' }
        ]
    },
    specialEvent: {
    title: 'The Turning Point',
    images: {
        default: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        stage2: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
        stage3: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'
    },
    description: 'Something has changed. The world around you shifts and warps. You feel the weight of all your decisions pressing down. A mysterious figure appears before you, offering a choice that will change everything.',
    choices: [
        { text: 'Accept the mysterious power', next: 'intro', item: 'Ancient Sword' },
        { text: 'Reject and continue your journey', next: 'intro' }
    ]
}
};

// Get the correct image based on decision count
function getSceneImage(scene) {
    if (gameState.decisionCount >= 100) {
        return scene.images.stage3;
    } else if (gameState.decisionCount >= 20) {
        return scene.images.stage2;
    } else {
        return scene.images.default;
    }
}

// Load a scene
function loadScene(sceneKey) {
    gameState.currentScene = sceneKey;
    const scene = scenes[sceneKey];
    
    const img = document.getElementById('gameImage');
    img.classList.add('fade-out');
    
    setTimeout(() => {
        // Update image and title
        img.src = getSceneImage(scene);
        img.classList.remove('fade-out');
        
        // Update description (add if you have an element for it)
        const descEl = document.getElementById('description');
        if (descEl) descEl.textContent = scene.description || '';
        
        // Render choices
        const choicesContainer = document.getElementById('choicesContainer');
        choicesContainer.innerHTML = '';

        scene.choices.forEach(choice => {
            // ✅ Always visible unless condition returns false
            const passesCondition = 
                typeof choice.condition === 'function' 
                    ? choice.condition() 
                    : true;

            if (!passesCondition) return; // skip only if explicitly false

            // ✅ Handle dynamic or static text
            let text = typeof choice.text === 'function'
                ? choice.text()
                : choice.text;

            // ✅ Provide a fallback if text is missing
            if (!text || text.trim() === '') {
                console.warn(`Choice in scene "${sceneKey}" has no text:`, choice);
                return;
            }

            // ✅ Create and append the button
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = text;
            button.onclick = () => makeChoice(choice);
            choicesContainer.appendChild(button);
        });

        // ✅ Update inventory display if applicable
        if (typeof updateInventory === 'function') updateInventory();
    }, 300);
}



function makeChoice(choice) {
    // Increment decision counter
    gameState.decisionCount++;
    
    // Check if special event should trigger
    if (gameState.decisionCount === 50 && choice.next !== 'specialEvent') {
        loadScene('specialEvent');
        return;
    }
    
    // Add item to inventory if choice has one
    if (choice.item && !gameState.inventory.includes(choice.item)) {
        gameState.inventory.push(choice.item);
    }
    
    // Load next scene
    loadScene(choice.next);
}

// Update inventory display
function updateInventory() {
    const inventoryItems = document.getElementById('inventoryItems');
    if (gameState.inventory.length === 0) {
        inventoryItems.textContent = 'Empty';
    } else {
        inventoryItems.textContent = gameState.inventory.join(', ');
    }
}

// Start the game (called from title screen)
function startGame() {
    const titleScreen = document.getElementById('titleScreen');
    const blackScreen = document.getElementById('blackScreen');
    
    // Hide title screen
    titleScreen.classList.add('hidden');
    
    // Show black screen
    setTimeout(() => {
        blackScreen.classList.add('active');
    }, 500);
    
    // Start first scene after black screen
    setTimeout(() => {
        loadScene('intro');
        blackScreen.classList.remove('active');
    }, 1000);
}