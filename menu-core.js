// Core menu display functionality
const MenuSystem = {
    // Initialize the menu with configuration and target element ID
    init: function(containerId, menuItems, customConfig = {}) {
      // Default configuration
      const defaultConfig = {
        // Layout settings
        layout: {
          maxColumns: 2,
          spacing: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          itemPadding: "20px",
          itemBorderColor: "#f0f0f0",
          itemBackgroundColor: "#fafafa"
        },
        
        // Typography settings
        typography: {
          titleColor: "#333333",
          titleSize: "18px",
          titleWeight: "600",
          descriptionColor: "#666666",
          descriptionSize: "14px",
          descriptionWeight: "400"
        },
        
        // Animation settings
        animation: {
          enableHoverEffect: true,
          transitionSpeed: "0.3s"
        }
      };
      
      // Merge custom config with defaults
      this.config = this.mergeConfigs(defaultConfig, customConfig);
      this.menuItems = menuItems;
      this.containerId = containerId;
      
      // Create menu when DOM is loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.createMenuDisplay());
      } else {
        this.createMenuDisplay();
      }
      
      // Add resize listener
      window.addEventListener('resize', () => this.updateLayoutForScreenSize());
    },
    
    // Helper to merge configs
    mergeConfigs: function(defaultConfig, customConfig) {
      const result = { ...defaultConfig };
      
      Object.keys(customConfig).forEach(key => {
        if (typeof customConfig[key] === 'object' && customConfig[key] !== null) {
          result[key] = this.mergeConfigs(defaultConfig[key] || {}, customConfig[key]);
        } else {
          result[key] = customConfig[key];
        }
      });
      
      return result;
    },
    
    // Create the menu display
    createMenuDisplay: function() {
      const menuContainer = document.getElementById(this.containerId);
      if (!menuContainer) return;
      
      // Clear existing content
      menuContainer.innerHTML = '';
      
      // Apply container styling
      menuContainer.style.backgroundColor = this.config.layout.backgroundColor;
      menuContainer.style.padding = this.config.layout.spacing;
      menuContainer.style.display = "flex";
      menuContainer.style.flexWrap = "wrap";
      menuContainer.style.gap = this.config.layout.spacing;
      menuContainer.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      menuContainer.style.boxSizing = "border-box";
      menuContainer.style.width = "100%";
      
      // Create menu items
      this.menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        // Apply menu item styling
        menuItem.style.flex = "1 0 300px";
        menuItem.style.padding = this.config.layout.itemPadding;
        menuItem.style.borderRadius = this.config.layout.borderRadius;
        menuItem.style.backgroundColor = this.config.layout.itemBackgroundColor;
        menuItem.style.border = `1px solid ${this.config.layout.itemBorderColor}`;
        
        // Add transition for hover effects if enabled
        if (this.config.animation.enableHoverEffect) {
          menuItem.style.transition = `all ${this.config.animation.transitionSpeed} ease-in-out`;
          menuItem.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
          });
          menuItem.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
          });
        }
        
        // Create and style the title
        const title = document.createElement('h3');
        title.className = 'menu-item-title';
        title.textContent = item.name;
        title.style.color = this.config.typography.titleColor;
        title.style.fontSize = this.config.typography.titleSize;
        title.style.fontWeight = this.config.typography.titleWeight;
        title.style.margin = '0 0 10px 0';
        
        // Create and style the description
        const description = document.createElement('p');
        description.className = 'menu-item-description';
        description.textContent = item.description;
        description.style.color = this.config.typography.descriptionColor;
        description.style.fontSize = this.config.typography.descriptionSize;
        description.style.fontWeight = this.config.typography.descriptionWeight;
        description.style.margin = '0';
        description.style.lineHeight = '1.5';
        
        // Append elements to the menu item
        menuItem.appendChild(title);
        menuItem.appendChild(description);
        
        // Append the menu item to the container
        menuContainer.appendChild(menuItem);
      });
      
      // Initial layout update
      this.updateLayoutForScreenSize();
    },
    
    // Update layout based on screen size
    updateLayoutForScreenSize: function() {
      const menuContainer = document.getElementById(this.containerId);
      if (!menuContainer) return;
      
      const menuItems = menuContainer.querySelectorAll('.menu-item');
      
      // Mobile view (under 768px)
      if (window.innerWidth < 768) {
        menuItems.forEach(item => {
          item.style.flex = "1 0 100%"; // Full width on mobile
        });
      } 
      // Tablet view (768px - 1024px)
      else if (window.innerWidth < 1024) {
        const columns = Math.min(2, this.config.layout.maxColumns);
        menuItems.forEach(item => {
          item.style.flex = `1 0 ${Math.floor((100 / columns) - 4)}%`;
        });
      } 
      // Desktop view
      else {
        menuItems.forEach(item => {
          item.style.flex = `1 0 ${Math.floor((100 / this.config.layout.maxColumns) - 4)}%`;
        });
      }
      
      // Add responsive typography
      if (window.innerWidth < 768) {
        menuItems.forEach(item => {
          item.querySelector('.menu-item-title').style.fontSize = 
            parseInt(this.config.typography.titleSize) * 0.9 + 'px';
          item.querySelector('.menu-item-description').style.fontSize = 
            parseInt(this.config.typography.descriptionSize) * 0.9 + 'px';
        });
      }
    }
  };