document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch weather data from our proxy server
    async function fetchWeatherData() {
        try {
            // Call our backend proxy instead of directly calling the OpenWeatherMap API
            const response = await fetch('/api/weather');
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }
            
            const data = await response.json();
            console.log('Weather data:', data);
            
            // Update display and gradient
            updateWeatherDisplay(data);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            
            // Use fallback data if fetch fails
            console.log('Using fallback data');
            const fallbackData = {
                main: {
                    temp: 68,
                    pressure: 1012
                },
                wind: {
                    speed: 8
                },
                weather: [
                    {
                        main: "Clouds"
                    }
                ],
                clouds: {
                    all: 75
                }
            };
            
            updateWeatherDisplay(fallbackData);
        }
    }
    
    function updateWeatherDisplay(data) {
        // Update temperature display
        const temp = Math.round(data.main.temp);
        document.getElementById("temp").textContent = temp;
        
        // Update wind display
        if (document.getElementById("wind")) {
            const wind = data.wind ? data.wind.speed.toFixed(1) : "--";
            document.getElementById("wind").textContent = wind;
        }
        
        // Update clouds display
        if (document.getElementById("clouds")) {
            const clouds = data.clouds ? data.clouds.all : "--";
            document.getElementById("clouds").textContent = clouds;
        }
        
        // Update sea level display
        if (document.getElementById("sea-level")) {
            const seaLevel = data.main.sea_level || data.main.pressure || "--";
            document.getElementById("sea-level").textContent = seaLevel;
        }
        
        // Update gradient
        updateGradient(data);
    }
    
    function updateGradient(data) {
        const temp = data.main.temp;
        const windSpeed = data.wind.speed;
        const condition = data.weather[0].main;
        
        // Base color selection based on temperature
        let color1, color2, color3;
        
        if (temp < 32) {
            // Cold (below freezing)
            color1 = {r: 10, g: 30, b: 100};
            color2 = {r: 30, g: 60, b: 150};
            color3 = {r: 80, g: 110, b: 190};
        } else if (temp < 50) {
            // Cool
            color1 = {r: 30, g: 80, b: 160};
            color2 = {r: 70, g: 120, b: 190};
            color3 = {r: 110, g: 160, b: 210};
        } else if (temp < 65) {
            // Mild
            color1 = {r: 70, g: 120, b: 180};
            color2 = {r: 140, g: 170, b: 200};
            color3 = {r: 180, g: 210, b: 230};
        } else if (temp < 80) {
            // Warm
            color1 = {r: 220, g: 150, b: 100};
            color2 = {r: 250, g: 180, b: 130};
            color3 = {r: 255, g: 210, b: 180};
        } else {
            // Hot
            color1 = {r: 220, g: 80, b: 50};
            color2 = {r: 250, g: 120, b: 70};
            color3 = {r: 255, g: 160, b: 110};
        }
        
        // Weather condition modifiers
        if (condition === "Rain" || condition === "Drizzle") {
            // Add blue tint for rain
            color1 = modifyColor(color1, -20, -20, 50);
            color2 = modifyColor(color2, -20, -20, 50);
            color3 = modifyColor(color3, -20, -20, 50);
        } else if (condition === "Snow") {
            // Add white/blue tint for snow
            color1 = modifyColor(color1, 50, 50, 70);
            color2 = modifyColor(color2, 50, 50, 70);
            color3 = modifyColor(color3, 50, 50, 70);
        } else if (condition === "Clouds") {
            // Add gray tint for clouds
            color1 = modifyColor(color1, 20, 20, 20);
            color2 = modifyColor(color2, 20, 20, 20);
            color3 = modifyColor(color3, 20, 20, 20);
        }
        
        // Wind affects gradient angle
        const windAngle = Math.min(windSpeed * 10, 180);
        
        // Start continuous gradient animation
        startGradientAnimation(color1, color2, color3, windAngle);
    }
    
    function modifyColor(color, redAdjust, greenAdjust, blueAdjust) {
        return {
            r: Math.max(0, Math.min(255, color.r + redAdjust)),
            g: Math.max(0, Math.min(255, color.g + greenAdjust)),
            b: Math.max(0, Math.min(255, color.b + blueAdjust))
        };
    }
    
    // Animation variables
    let animationRunning = false;
    let baseColors = {
        color1: {r: 0, g: 0, b: 0},
        color2: {r: 0, g: 0, b: 0},
        color3: {r: 0, g: 0, b: 0}
    };
    let baseAngle = 0;
    
    // Function to continuously animate the gradient
    function startGradientAnimation(color1, color2, color3, angle) {
        // Store base values
        baseColors.color1 = {...color1};
        baseColors.color2 = {...color2};
        baseColors.color3 = {...color3};
        baseAngle = angle;
        
        // Only start if not already running
        if (!animationRunning) {
            animationRunning = true;
            animateGradient();
        }
    }
    
    function animateGradient() {
        if (!animationRunning) return;
        
        const gradientBg = document.getElementById("gradient-bg");
        const now = Date.now() / 1000; // Current time in seconds
        
        // Create subtle variations based on time
        const angleVariation = Math.sin(now * 0.1) * 20; // Slow angle movement
        const currentAngle = baseAngle + angleVariation;
        
        // Apply subtle variations to each color
        const currentColor1 = {
            r: baseColors.color1.r + Math.sin(now * 0.3) * 30,
            g: baseColors.color1.g + Math.sin(now * 0.4) * 30,
            b: baseColors.color1.b + Math.sin(now * 0.5) * 30
        };
        
        const currentColor2 = {
            r: baseColors.color2.r + Math.sin(now * 0.4) * 30,
            g: baseColors.color2.g + Math.sin(now * 0.5) * 30,
            b: baseColors.color2.b + Math.sin(now * 0.3) * 30
        };
        
        const currentColor3 = {
            r: baseColors.color3.r + Math.sin(now * 0.5) * 30,
            g: baseColors.color3.g + Math.sin(now * 0.3) * 30,
            b: baseColors.color3.b + Math.sin(now * 0.4) * 30
        };
        
        // Convert to RGB strings
        const rgbColor1 = `rgb(${Math.round(currentColor1.r)}, ${Math.round(currentColor1.g)}, ${Math.round(currentColor1.b)})`;
        const rgbColor2 = `rgb(${Math.round(currentColor2.r)}, ${Math.round(currentColor2.g)}, ${Math.round(currentColor2.b)})`;
        const rgbColor3 = `rgb(${Math.round(currentColor3.r)}, ${Math.round(currentColor3.g)}, ${Math.round(currentColor3.b)})`;
        
        // Apply new gradient
        gradientBg.style.background = `linear-gradient(${currentAngle}deg, ${rgbColor1}, ${rgbColor2}, ${rgbColor3})`;
        
        // Continue animation loop
        requestAnimationFrame(animateGradient);
    }
    
    // Initial fetch
    fetchWeatherData();
    
    // Refresh data every 15 minutes (900000 ms)
    setInterval(fetchWeatherData, 900000);
    
    // Fish animation with names
    const fishData = [
        { name: 'Scup', image: 'images/scup.png', width: 350 },
        { name: 'Bluefish', image: 'images/bluefish.png', width: 400 },
        { name: 'Chain Pickerel', image: 'images/chainpickerel.png', width: 550 },
        { name: 'Bluegill', image: 'images/bluegill.png', width: 300 },
        { name: 'Perch', image: 'images/perch.png', width: 350 }
    ];
    
    let currentFishIndex = 0;
    let fishX = 300;
    let fishY = 300;
    let fishSpeedX = 5;
    let fishSpeedY = 1.5;
    const fishElement = document.getElementById('fish');
    const fishNameElement = document.createElement('div');
    
    // Create and add fish name element
    fishNameElement.className = 'fish-name';
    document.getElementById('fish-container').appendChild(fishNameElement);
    
    // Set initial fish image and name
    if (fishElement) {
        fishElement.src = fishData[currentFishIndex].image;
        fishNameElement.textContent = fishData[currentFishIndex].name;
    }
    
    function animateFish() {
        if (!fishElement) return;
        
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const fishWidth = fishElement.offsetWidth || 120; // Fallback if offsetWidth is 0
        const fishHeight = fishElement.offsetHeight || 60; // Fallback if offsetHeight is 0
        
        // Update fish position
        fishX += fishSpeedX;
        fishY += fishSpeedY;
        
        // Check boundaries and change direction when hitting edges
        let hitWall = false;
        
        if (fishX <= 0 || fishX + fishWidth >= windowWidth) {
            fishSpeedX = -fishSpeedX;
            hitWall = true;
        }
        
        if (fishY <= 0 || fishY + fishHeight >= windowHeight) {
            fishSpeedY = -fishSpeedY;
            hitWall = true;
        }
        
        // If fish hits wall, change to a new fish
        if (hitWall) {
            // Pick a new fish that's different from the current one
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * fishData.length);
            } while (newIndex === currentFishIndex && fishData.length > 1);
            
            currentFishIndex = newIndex;
            fishElement.src = fishData[currentFishIndex].image;
            fishElement.style.width = fishData[currentFishIndex].width + 'px';
            
            // Update the fish name
            fishNameElement.textContent = fishData[currentFishIndex].name;
        }
        
        // Apply position
        fishElement.style.left = fishX + 'px';
        fishElement.style.top = fishY + 'px';
        
        // Position the name below the fish
        fishNameElement.style.left = (fishX + fishWidth/2) + 'px';
        fishNameElement.style.top = (fishY + fishHeight + 10) + 'px';
        
        // Flip fish based on direction
        if (fishSpeedX > 0) {
            fishElement.style.transform = 'scaleX(1)';
        } else {
            fishElement.style.transform = 'scaleX(-1)';
        }
        
        // Continue animation
        requestAnimationFrame(animateFish);
    }
    
    // Start fish animation
    animateFish();
});