// Глобальные переменные
let currentMode = 'target'; // target или inventory
let currentStrategy = 'eco';
let selectedTargets = [];
let currentFilter = 'all';
let currentToolFilter = 'all';

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderTargetsGrid();
    renderToolsGrid();
    updateResults();
});

// Инициализация обработчиков событий
function initializeEventListeners() {
    // Переключение режимов
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchMode(mode);
        });
    });

    // Переключение стратегий
    document.querySelectorAll('.strategy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const strategy = this.dataset.strategy;
            switchStrategy(strategy);
        });
    });

    // Поиск целей
    document.getElementById('search-targets').addEventListener('input', function() {
        renderTargetsGrid();
    });

    // Фильтры категорий
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            switchFilter(category);
        });
    });

    // Фильтры инструментов
    document.querySelectorAll('[data-tool-category]').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.toolCategory;
            switchToolFilter(category);
        });
    });

    // Кнопка расчета
    document.getElementById('calculate-btn').addEventListener('click', function() {
        if (currentMode === 'target') {
            calculateTargetRaid();
        } else {
            showToolsModal();
        }
    });

    // Кнопка сброса
    document.getElementById('reset-btn').addEventListener('click', function() {
        resetAll();
    });

    // Модальное окно
    document.getElementById('close-modal').addEventListener('click', function() {
        closeModal();
    });

    // Закрытие модального окна по клику вне его
    document.getElementById('raid-tools-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Переключение режимов
function switchMode(mode) {
    currentMode = mode;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    // Обновляем интерфейс
    updateModeInterface();
}

// Обновление интерфейса в зависимости от режима
function updateModeInterface() {
    const leftPanel = document.querySelector('.left-panel h3');
    const centerPanel = document.querySelector('.center-panel h3');
    const calculateBtn = document.getElementById('calculate-btn');

    if (currentMode === 'target') {
        leftPanel.textContent = 'Выберите цели для рейда:';
        centerPanel.textContent = 'Выбранные цели:';
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Рассчитать рейд';
    } else {
        leftPanel.textContent = 'Выберите цели для рейда:';
        centerPanel.textContent = 'Выбранные цели:';
        calculateBtn.innerHTML = '<i class="fas fa-tools"></i> Выбрать инструменты';
    }
}

// Переключение стратегий
function switchStrategy(strategy) {
    currentStrategy = strategy;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.strategy-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-strategy="${strategy}"]`).classList.add('active');

    // Перерасчитываем результат если есть выбранные цели
    if (selectedTargets.length > 0) {
        updateResults();
    }
}

// Переключение фильтров целей
function switchFilter(category) {
    currentFilter = category;
    
    // Обновляем активную кнопку
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    renderTargetsGrid();
}

// Переключение фильтров инструментов
function switchToolFilter(category) {
    currentToolFilter = category;
    
    // Обновляем активную кнопку
    document.querySelectorAll('[data-tool-category]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tool-category="${category}"]`).classList.add('active');

    renderToolsGrid();
}

// Отображение сетки целей
function renderTargetsGrid() {
    const grid = document.getElementById('targets-grid');
    const searchTerm = document.getElementById('search-targets').value.toLowerCase();
    
    grid.innerHTML = '';

    for (const [id, target] of Object.entries(raidableObjects)) {
        // Фильтрация по категории
        if (currentFilter !== 'all' && target.category !== currentFilter) {
            continue;
        }

        // Фильтрация по поиску
        if (searchTerm && !target.name.toLowerCase().includes(searchTerm)) {
            continue;
        }

        const targetElement = createTargetElement(id, target);
        grid.appendChild(targetElement);
    }
}

// Создание элемента цели
function createTargetElement(id, target) {
    const div = document.createElement('div');
    div.className = 'target-item';
    div.dataset.targetId = id;

    // Проверяем, выбрана ли цель
    const selectedTarget = selectedTargets.find(t => t.id === id);
    if (selectedTarget) {
        div.classList.add('selected');
    }

    div.innerHTML = `
        <img src="${target.image}" alt="${target.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
        <div class="name">${target.name}</div>
        <div class="health">${target.health} HP</div>
    `;

    // Обработчик клика
    div.addEventListener('click', function() {
        if (selectedTarget) {
            // Если уже выбрана, увеличиваем количество
            changeQuantity(id, 1);
        } else {
            // Если не выбрана, добавляем
            selectTarget(id);
        }
    });

    return div;
}

// Выбор цели
function selectTarget(id) {
    const target = raidableObjects[id];
    if (!target) return;

    // Добавляем в выбранные цели
    selectedTargets.push({
        id: id,
        quantity: 1
    });

    // Обновляем интерфейс
    renderTargetsGrid();
    renderSelectedTargets();
    updateResults();
}

// Изменение количества
function changeQuantity(id, delta) {
    const targetIndex = selectedTargets.findIndex(t => t.id === id);
    if (targetIndex === -1) return;

    selectedTargets[targetIndex].quantity = Math.max(1, selectedTargets[targetIndex].quantity + delta);
    
    renderTargetsGrid();
    renderSelectedTargets();
    updateResults();
}

// Установка количества
function setQuantity(id, value) {
    const targetIndex = selectedTargets.findIndex(t => t.id === id);
    if (targetIndex === -1) return;

    const quantity = Math.max(1, parseInt(value) || 1);
    selectedTargets[targetIndex].quantity = quantity;
    
    renderSelectedTargets();
    updateResults();
}

// Удаление цели
function removeTarget(id) {
    selectedTargets = selectedTargets.filter(t => t.id !== id);
    
    renderTargetsGrid();
    renderSelectedTargets();
    updateResults();
}

// Отображение выбранных целей
function renderSelectedTargets() {
    const container = document.getElementById('selected-targets');
    
    if (selectedTargets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-target"></i>
                <p>Выберите цели для рейда</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    selectedTargets.forEach(target => {
        const targetData = raidableObjects[target.id];
        if (!targetData) return;

        const div = document.createElement('div');
        div.className = 'selected-target';

        div.innerHTML = `
            <div class="selected-target-info">
                <img src="${targetData.image}" alt="${targetData.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
                <div class="selected-target-details">
                    <div class="name">${targetData.name}</div>
                    <div class="stats">${targetData.health} HP каждый</div>
                </div>
            </div>
            <div class="target-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity('${target.id}', -1)">-</button>
                    <input type="number" class="quantity-input" value="${target.quantity}" min="1" onchange="setQuantity('${target.id}', this.value)">
                    <button class="quantity-btn" onclick="changeQuantity('${target.id}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeTarget('${target.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        container.appendChild(div);
    });
}

// Расчет рейда для режима "что рейдить"
function calculateTargetRaid() {
    if (selectedTargets.length === 0) {
        showNotification('Выберите цели для рейда', 'warning');
        return;
    }

    const result = calculateRaid(selectedTargets, currentStrategy);
    displayResults(result);
}

// Отображение результатов
function displayResults(result) {
    const container = document.getElementById('results-section');
    
    container.innerHTML = `
        <div class="result-category">
            <h4>
                <i class="fas fa-tools"></i>
                Необходимые инструменты
            </h4>
            ${Object.entries(result.tools).length > 0 ? 
                Object.entries(result.tools).map(([toolId, quantity]) => {
                    const tool = raidTools[toolId];
                    return `
                        <div class="result-item">
                            <div class="result-item-info">
                                <img src="${tool.image}" alt="${tool.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
                                <span>${tool.name}</span>
                            </div>
                            <span class="quantity">${quantity}</span>
                        </div>
                    `;
                }).join('') : 
                '<div class="result-item"><span>Инструменты не требуются</span></div>'
            }
        </div>

        <div class="result-category">
            <h4>
                <i class="fas fa-cogs"></i>
                Ресурсы для крафта
            </h4>
            ${Object.entries(result.resources).length > 0 ? 
                Object.entries(result.resources).map(([resourceId, quantity]) => {
                    const resource = resources[resourceId];
                    if (!resource) return '';
                    return `
                        <div class="result-item">
                            <div class="result-item-info">
                                <img src="${resource.image}" alt="${resource.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
                                <span>${resource.name}</span>
                            </div>
                            <span class="quantity">${quantity}</span>
                        </div>
                    `;
                }).join('') : 
                '<div class="result-item"><span>Ресурсы не требуются</span></div>'
            }
        </div>

        <div class="result-category">
            <h4>
                <i class="fas fa-cube"></i>
                Сырые ресурсы (итого)
            </h4>
            ${Object.entries(result.totalCost).length > 0 ? 
                Object.entries(result.totalCost).map(([resourceId, quantity]) => {
                    const resource = resources[resourceId];
                    if (!resource) return '';
                    return `
                        <div class="result-item">
                            <div class="result-item-info">
                                <img src="${resource.image}" alt="${resource.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
                                <span>${resource.name}</span>
                            </div>
                            <span class="quantity">${quantity}</span>
                        </div>
                    `;
                }).join('') : 
                '<div class="result-item"><span>Сырые ресурсы не требуются</span></div>'
            }
        </div>

        <div class="result-category">
            <h4>
                <i class="fas fa-info-circle"></i>
                Информация о стратегии
            </h4>
            <div class="result-item">
                <span>${raidStrategies[result.strategy].description}</span>
            </div>
        </div>
    `;
}

// Обновление результатов
function updateResults() {
    if (selectedTargets.length > 0) {
        calculateTargetRaid();
    } else {
        const container = document.getElementById('results-section');
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-bar"></i>
                <p>Результаты появятся после расчета</p>
            </div>
        `;
    }
}

// Отображение сетки инструментов
function renderToolsGrid() {
    const grid = document.getElementById('tools-grid');
    
    grid.innerHTML = '';

    for (const [id, tool] of Object.entries(raidTools)) {
        // Фильтрация по категории
        if (currentToolFilter !== 'all' && tool.category !== currentToolFilter) {
            continue;
        }

        // Фильтрация по доступности в текущей стратегии
        if (!raidStrategies[currentStrategy].allowedTools.includes(id)) {
            continue;
        }

        const toolElement = createToolElement(id, tool);
        grid.appendChild(toolElement);
    }
}

// Создание элемента инструмента
function createToolElement(id, tool) {
    const div = document.createElement('div');
    div.className = 'tool-item';
    div.dataset.toolId = id;

    let damageText = tool.damageMap ? 'Переменный урон' : `${tool.damage} урона`;
    
    // Добавляем информацию о специализации
    if (tool.speciality) {
        const specialityNames = {
            'wood': '🌳 Дерево',
            'stone': '🪨 Камень', 
            'metal': '🛠️ Металл',
            'metal_doors': '🚪 Мет. двери',
            'doors': '🚪 Двери'
        };
        damageText += ` (${specialityNames[tool.speciality] || tool.speciality})`;
    }
    
    div.innerHTML = `
        <img src="${tool.image}" alt="${tool.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IiM2NjYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXoiLz48L3N2Zz4='">
        <div class="name">${tool.name}</div>
        <div class="damage">${damageText}</div>
    `;

    div.addEventListener('click', function() {
        selectTool(id);
    });

    return div;
}

// Выбор инструмента (для режима "чем рейдить")
function selectTool(toolId) {
    // Здесь можно добавить логику выбора инструментов
    // Пока просто показываем уведомление
    showNotification(`Выбран: ${raidTools[toolId].name}`, 'info');
}

// Показ модального окна с инструментами
function showToolsModal() {
    if (selectedTargets.length === 0) {
        showNotification('Сначала выберите цели для рейда', 'warning');
        return;
    }

    const modal = document.getElementById('raid-tools-modal');
    modal.classList.add('active');
    renderToolsGrid();
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('raid-tools-modal');
    modal.classList.remove('active');
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i>
        <span>${message}</span>
    `;

    // Добавляем стили для уведомлений если их нет
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-primary);
                box-shadow: var(--shadow);
                z-index: 2000;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.3s ease;
            }
            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            .notification-info { border-color: #2196F3; }
            .notification-warning { border-color: var(--warning-color); }
            .notification-success { border-color: var(--success-color); }
        `;
        document.head.appendChild(style);
    }

    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => notification.classList.add('show'), 100);

    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Функция сброса всех данных
function resetAll() {
    selectedTargets = [];
    currentFilter = 'all';
    currentToolFilter = 'all';
    
    // Сбрасываем активные фильтры
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    document.querySelectorAll('[data-tool-category]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-tool-category="all"]').classList.add('active');
    
    // Очищаем поиск
    document.getElementById('search-targets').value = '';
    
    // Обновляем интерфейс
    renderTargetsGrid();
    renderSelectedTargets();
    updateResults();
    
    showNotification('Все данные очищены', 'success');
}

// Экспортируем функции в глобальную область видимости
window.changeQuantity = changeQuantity;
window.setQuantity = setQuantity;
window.removeTarget = removeTarget;
