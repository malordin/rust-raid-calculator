// База данных объектов для рейда
const raidableObjects = {
    // Двери
    'door.hinged.wood': {
        name: 'Деревянная дверь',
        category: 'doors',
        health: 200,
        image: 'img_raidable/door.hinged.wood.webp',
        material: 'wood'
    },
    'door.hinged.metal': {
        name: 'Металлическая дверь',
        category: 'doors',
        health: 250,
        image: 'img_raidable/door.hinged.metal.webp',
        material: 'metal'
    },
    'door.hinged.toptier': {
        name: 'Бронированная дверь',
        category: 'doors',
        health: 800,
        image: 'img_raidable/door.hinged.toptier.webp',
        material: 'armored'
    },


    // Стены
    'wall.wood': {
        name: 'Деревянная стена',
        category: 'walls',
        health: 250,
        image: 'img_raidable/wall.wood.png',
        material: 'wood'
    },
    'wall.stone': {
        name: 'Каменная стена',
        category: 'walls',
        health: 500,
        image: 'img_raidable/wall.stone.png',
        material: 'stone'
    },
    'wall.metal': {
        name: 'Металлическая стена',
        category: 'walls',
        health: 1000,
        image: 'img_raidable/wall.metal.png',
        material: 'metal'
    },
    'wall.toptier': {
        name: 'Бронированная стена',
        category: 'walls',
        health: 2000,
        image: 'img_raidable/wall.toptier.png',
        material: 'armored'
    },

    // Полы
    'floor.wood': {
        name: 'Деревянный пол',
        category: 'floors',
        health: 250,
        image: 'img_raidable/floor.wood.png',
        material: 'wood'
    },
    'floor.stone': {
        name: 'Каменный пол',
        category: 'floors',
        health: 500,
        image: 'img_raidable/floor.stone.png',
        material: 'stone'
    },
    'floor.metal': {
        name: 'Металлический пол',
        category: 'floors',
        health: 1000,
        image: 'img_raidable/floor.metal.png',
        material: 'metal'
    },
    'floor.toptier': {
        name: 'Бронированный пол',
        category: 'floors',
        health: 2000,
        image: 'img_raidable/floor.toptier.png',
        material: 'armored'
    },

    // Потолки
    'roof.wood': {
        name: 'Деревянный потолок',
        category: 'roofs',
        health: 250,
        image: 'img_raidable/roof.wood.png',
        material: 'wood'
    },
    'roof.stone': {
        name: 'Каменный потолок',
        category: 'roofs',
        health: 500,
        image: 'img_raidable/roof.stone.png',
        material: 'stone'
    },
    'roof.metal': {
        name: 'Металлический потолок',
        category: 'roofs',
        health: 1000,
        image: 'img_raidable/roof.metal.png',
        material: 'metal'
    },
    'roof.toptier': {
        name: 'Бронированный потолок',
        category: 'roofs',
        health: 2000,
        image: 'img_raidable/roof.toptier.png',
        material: 'armored'
    },

    // Окна
    'window.wood': {
        name: 'Деревянное окно',
        category: 'structures',
        health: 125,
        image: 'img_raidable/window.wood.png',
        material: 'wood'
    },
    'window.metal': {
        name: 'Металлическое окно',
        category: 'structures',
        health: 250,
        image: 'img_raidable/window.metal.png',
        material: 'metal'
    },
    'window.toptier': {
        name: 'Бронированное окно',
        category: 'structures',
        health: 500,
        image: 'img_raidable/window.toptier.png',
        material: 'armored'
    },

    // Гаражная дверь
    'wall.frame.garagedoor': {
        name: 'Гаражная дверь',
        category: 'doors',
        health: 500,
        image: 'img_raidable/wall.frame.garagedoor.webp',
        material: 'metal'
    },

    // Важные объекты
    'cupboard.tool': {
        name: 'Шкаф с инструментами',
        category: 'structures',
        health: 1000,
        image: 'img_raidable/cupboard.tool.webp',
        material: 'metal'
    },
    'box.wooden.large': {
        name: 'Большой деревянный ящик',
        category: 'structures',
        health: 500,
        image: 'img_raidable/box.wooden.large.webp',
        material: 'wood'
    },
    'autoturret': {
        name: 'Автотурель',
        category: 'structures',
        health: 1000,
        image: 'img_raidable/autoturret.webp',
        material: 'metal'
    }
};

// База данных инструментов для рейда
const raidTools = {
    // Взрывчатка (Верстак 3)
    'explosive.timed': {
        name: 'C4',
        category: 'explosives',
        workbench: 3,
        damageMap: {
            'wall.wood': 250, // 1 C4
            'wall.stone': 250, // 2 C4
            'wall.metal': 250, // 4 C4
            'wall.toptier': 250, // 8 C4
            'door.hinged.wood': 200, // 1 C4
            'door.hinged.metal': 250, // 1 C4
            'wall.frame.garagedoor': 250, // 2 C4
            'door.hinged.toptier': 267 // 3 C4
        },
        image: 'img_raid/explosive.timed.webp',
        resources: {
            'techparts': 2,
            'cloth': 20,
            'explosive.gunpowder': 20
        }
    },
    'explosive.satchel': {
        name: 'Связка бобовых гранат',
        category: 'explosives',
        workbench: 1,
        damage: 475,
        image: 'img_raid/explosive.satchel.webp',
        resources: {
            'grenade.beancan': 4,
            'stash.small': 1,
            'rope': 1
        }
    },
    'grenade.beancan': {
        name: 'Бобовая граната',
        category: 'explosives',
        workbench: 1,
        damageMap: {
            'wall.wood': 83.33, // 3 бобовых для разрушения
            'wall.stone': 50, // 10 бобовых для разрушения
            'wall.metal': 43.48, // 23 бобовых для разрушения
            'wall.toptier': 43.48, // 46 бобовых для разрушения
            'door.hinged.wood': 100, // 2 бобовых для разрушения
            'door.hinged.metal': 62.5, // 4 бобовых для разрушения
            'wall.frame.garagedoor': 55.56, // 9 бобовых для разрушения
            'door.hinged.toptier': 53.33 // 15 бобовых для разрушения
        },
        image: 'img_raid/grenade.beancan.webp',
        resources: {
            'explosive.gunpowder': 10,
            'metal.fragments': 15
        }
    },

    // Ракеты (Верстак 3)
    'ammo.rocket.basic': {
        name: 'Ракета',
        category: 'explosives',
        workbench: 3,
        damageMap: {
            'wall.wood': 125, // 2 ракеты
            'wall.stone': 125, // 4 ракеты
            'wall.metal': 125, // 8 ракет
            'wall.toptier': 133, // 15 ракет
            'door.hinged.wood': 200, // 1 ракета
            'door.hinged.metal': 125, // 2 ракеты
            'wall.frame.garagedoor': 167, // 3 ракеты
            'door.hinged.toptier': 160 // 5 ракет
        },
        image: 'img_raid/ammo.rocket.basic.webp',
        resources: {
            'metalpipe': 2,
            'explosive.gunpowder': 150,
            'explosive.explosive': 10
        }
    },
    'ammo.rocket.hv': {
        name: 'Высокоскоростная ракета',
        category: 'explosives',
        workbench: 3,
        damage: 400,
        image: 'img_raid/ammo.rocket.hv.webp',
        resources: {
            'explosive.gunpowder': 200,
            'metalpipe': 3
        }
    },

    // Гранатомет
    'ammo.grenadelauncher.he': {
        name: 'Граната 40мм',
        category: 'explosives',
        workbench: 2,
        damage: 200,
        image: 'img_raid/ammo.grenadelauncher.he.webp',
        resources: {
            'explosive.gunpowder': 60,
            'metal.fragments': 30
        }
    },

    // Ближний бой
    'hatchet': {
        name: 'Топор',
        category: 'melee',
        workbench: 0,
        damage: 4, // урон по деревянным структурам
        image: 'img_raid/hatchet.webp',
        speciality: 'wood',
        resources: {
            'metal.fragments': 40,
            'wood': 100
        }
    },
    'pickaxe': {
        name: 'Кирка',
        category: 'melee',
        workbench: 0,
        damage: 2, // урон по каменным структурам
        image: 'img_raid/pickaxe.webp',
        speciality: 'stone',
        resources: {
            'metal.fragments': 40,
            'wood': 100
        }
    },
    'hammer.salvaged': {
        name: 'Молоток',
        category: 'melee',
        workbench: 1,
        damage: 6, // урон по металлическим дверям
        image: 'img_raid/hammer.salvaged.webp',
        speciality: 'metal_doors',
        resources: {
            'metal.fragments': 75,
            'metal.refined': 2
        }
    },
    'machete': {
        name: 'Мачете',
        category: 'melee',
        workbench: 1,
        damage: 3,
        image: 'img_raid/machete.webp',
        resources: {
            'metal.fragments': 40,
            'cloth': 10
        }
    },

    // Осадные орудия (Верстак 2)
    'batteringram': {
        name: 'Таран',
        category: 'tools',
        workbench: 2,
        damageMap: {
            'door.hinged.wood': 200, // 1 удар
            'wall.wood': 90, // 3 удара при 250 HP
            'floor.wood': 90, // 3 удара при 250 HP
            'roof.wood': 90, // 3 удара при 250 HP
            'door.hinged.metal': 80, // 4 удара при 250 HP + 50 HP
            'cupboard.tool': 1000 // мгновенно уничтожает TC
        },
        image: 'img_raid/batteringram.webp',
        speciality: 'doors',
        durability: 200,
        durabilityLoss: 20,
        maxHits: 9,
        repairCost: 16, // МВК за одну починку
        deploymentCost: {
            'wood': 1000,
            'metal.fragments': 500
        },
        resources: {
            'wood': 500,
            'sheetmetal': 4,
            'tarp': 1,
            'metal.refined': 100
        }
    },
    'ballista.bolt.hammerhead': {
        name: 'Болт баллисты',
        category: 'tools',
        workbench: 2,
        damage: 40,
        image: 'img_raid/ballista.bolt.hammerhead.webp',
        resources: {
            'wood': 25,
            'metal.fragments': 10
        }
    },

    // Зажигательные (Верстак 2)
    'grenade.molotov': {
        name: 'Коктейль Молотова',
        category: 'tools',
        workbench: 2,
        damage: 25, // урон ТОЛЬКО по деревянным структурам
        image: 'img_raid/grenade.molotov.webp',
        speciality: 'wood', // работает ТОЛЬКО с деревом
        resources: {
            'cloth': 1,
            'fat.animal': 4
        }
    },

    'ammo.rocket.fire': {
        name: 'Зажигательная ракета',
        category: 'explosives',
        workbench: 3,
        damage: 300, // урон + огонь по деревянным структурам
        image: 'img_raid/ammo.rocket.fire.webp',
        speciality: 'wood',
        resources: {
            'explosive.gunpowder': 150,
            'fat.animal': 15,
            'metalpipe': 2
        }
    },

    // Патрон 5.56 разрывной
    'ammo.rifle.explosive': {
        name: 'Патрон 5.56 (разрывной)',
        category: 'explosives',
        workbench: 3,
        damageMap: {
            'wall.wood': 5.1, // 49 патронов
            'wall.stone': 2.7, // 185 патронов
            'wall.metal': 2.5, // 400 патронов
            'wall.toptier': 2.5, // 799 патронов
            'door.hinged.wood': 10.5, // 19 патронов
            'door.hinged.metal': 4.0, // 63 патрона
            'wall.frame.garagedoor': 3.3, // 152 патрона
            'door.hinged.toptier': 4.0 // 200 патронов
        },
        image: 'img_raid/ammo.rifle.explosive.webp',
        resources: {
            'metal.fragments': 10,
            'explosive.gunpowder': 20,
            'sulfur': 10
        }
    }
};

// Ресурсы для крафта
const resources = {
    'metal.fragments': {
        name: 'Металлолом',
        image: 'img_resources/metal.fragments.webp'
    },
    'sulfur': {
        name: 'Сера',
        image: 'img_resources/sulfur.webp'
    },
    'charcoal': {
        name: 'Уголь',
        image: 'img_resources/charcoal.webp'
    },
    'cloth': {
        name: 'Ткань',
        image: 'img_resources/cloth.webp'
    },
    'rope': {
        name: 'Веревка',
        image: 'img_resources/rope.webp'
    },
    'techparts': {
        name: 'Техчасти',
        image: 'img_resources/techparts.webp'
    },
    'fat.animal': {
        name: 'Жир',
        image: 'img_resources/fat.animal.webp'
    },
    'metalpipe': {
        name: 'Металлическая труба',
        image: 'img_resources/metalpipe.webp'
    },
    'wood': {
        name: 'Дерево',
        image: 'img_resources/wood.webp'
    },
    'sheetmetal': {
        name: 'Листовой металл',
        image: 'img_resources/sheetmetal.webp'
    },
    'tarp': {
        name: 'Брезент',
        image: 'img_resources/tarp.webp'
    },
    'lowgradefuel': {
        name: 'Топливо низкого качества',
        image: 'img_resources/fat.animal.webp' // заглушка
    },
    'explosive.explosive': {
        name: 'Взрывчатое вещество',
        image: 'img_resources/sulfur.webp', // заглушка
        recipe: {
            'explosive.gunpowder': 50,
            'lowgradefuel': 3,
            'sulfur': 10,
            'metal.fragments': 10
        }
    },
    'explosive.gunpowder': {
        name: 'Порох',
        image: 'img_resources/charcoal.webp', // заглушка
        recipe: {
            'sulfur': 12,
            'charcoal': 18
        }
    },
    'metal.refined': {
        name: 'Метал высокого качества (МВК)',
        image: 'img_resources/metal.refined.webp'
    },
    'stash.small': {
        name: 'Маленький тайник',
        image: 'img_resources/stash.small.webp',
        recipe: {
            'cloth': 10,
            'metal.fragments': 20
        }
    }
};

// Стратегии рейда
const raidStrategies = {
    eco: {
        name: 'ECO рейд',
        description: 'Экономичный рейд без взрывчатки',
        allowedTools: ['hatchet', 'pickaxe', 'hammer.salvaged', 'machete'],
        workbenchLevel: 0
    },
    t1: {
        name: 'Верстак T1',
        description: 'Рейд с верстаком 1 уровня',
        allowedTools: ['explosive.satchel', 'grenade.beancan', 'hatchet', 'pickaxe', 'hammer.salvaged', 'machete'],
        workbenchLevel: 1
    },
    t2: {
        name: 'Верстак T2',
        description: 'Рейд с верстаком 2 уровня',
        allowedTools: ['explosive.satchel', 'grenade.beancan', 'ammo.grenadelauncher.he', 'batteringram', 'ballista.bolt.hammerhead', 'grenade.molotov', 'hatchet', 'pickaxe', 'hammer.salvaged', 'machete'],
        workbenchLevel: 2
    },
    t3: {
        name: 'Верстак T3',
        description: 'Рейд с верстаком 3 уровня - все доступно',
        allowedTools: ['explosive.satchel', 'grenade.beancan', 'ammo.grenadelauncher.he', 'batteringram', 'ballista.bolt.hammerhead', 'grenade.molotov', 'explosive.timed', 'ammo.rocket.basic', 'ammo.rocket.hv', 'ammo.rocket.fire', 'ammo.rifle.explosive', 'hatchet', 'pickaxe', 'hammer.salvaged', 'machete'],
        workbenchLevel: 3
    }
};

// Функция для получения оптимального урона по материалу
function getBestDamageForMaterial(material, strategy, targetId) {
    const allowedTools = raidStrategies[strategy].allowedTools;
    let bestDamage = 0;
    let bestTool = null;

    for (const toolId of allowedTools) {
        const tool = raidTools[toolId];
        if (!tool) continue;

        let damage = 0;
        
        // Проверяем специализацию ПЕРЕД расчетом урона
        if (tool.speciality) {
            // Если у инструмента есть специализация, проверяем совместимость
            let isCompatible = false;
            
            if (tool.speciality === material) {
                isCompatible = true; // прямое соответствие
            } else if (tool.speciality === 'metal_doors' && targetId.includes('door') && material === 'metal') {
                isCompatible = true; // молоток по металлическим дверям
            } else if (tool.speciality === 'doors' && targetId.includes('door')) {
                isCompatible = true; // таран по любым дверям
            } else if (tool.damageMap && tool.damageMap[targetId]) {
                isCompatible = true; // инструмент имеет специальный урон для этой цели
            }
            
            if (!isCompatible) {
                continue; // инструмент не подходит
            }
        }
        
        // Проверяем, есть ли специальные значения урона для конкретной цели
        if (tool.damageMap && tool.damageMap[targetId]) {
            damage = tool.damageMap[targetId];
        } else if (tool.damage) {
            damage = tool.damage;
            
            // Специальные бонусы для определенных материалов
            if (tool.speciality === material) {
                damage *= 2;
            } else if (tool.speciality === 'wood' && material === 'wood') {
                damage *= 3;
            } else if (tool.speciality === 'metal_doors' && material === 'metal' && targetId.includes('door')) {
                damage *= 2;
            }
            // Если нет специализации - универсальный инструмент (взрывчатка)
            // остается базовый урон
        }

        if (damage <= 0) continue;

        // Простое сравнение урона, приоритет более мощным инструментам
        if (damage > bestDamage) {
            bestDamage = damage;
            bestTool = toolId;
        }
    }

    return { damage: bestDamage, tool: bestTool };
}

// Функция расчета рейда
function calculateRaid(targets, strategy) {
    const result = {
        tools: {},
        resources: {},
        totalCost: {},
        strategy: strategy
    };

    for (const target of targets) {
        const targetData = raidableObjects[target.id];
        if (!targetData) continue;

        const { damage, tool } = getBestDamageForMaterial(targetData.material, strategy, target.id);
        if (!tool || damage === 0) continue;

        let requiredHits, totalRequired;
        
        // Специальная обработка для тарана
        if (tool === 'batteringram') {
            const toolData = raidTools[tool];
            
            // Определяем урон для конкретной цели
            if (target.id === 'cupboard.tool' || toolData.damageMap[target.id] >= targetData.health) {
                // TC или объекты, уничтожаемые с 1 удара
                requiredHits = 1;
            } else {
                requiredHits = Math.ceil(targetData.health / damage);
            }
            
            totalRequired = requiredHits * target.quantity;
            
            // Рассчитываем количество таранов с учетом прочности
            const taramsNeeded = Math.ceil(totalRequired / toolData.maxHits);
            
            // Добавляем тараны
            if (!result.tools[tool]) {
                result.tools[tool] = 0;
            }
            result.tools[tool] += taramsNeeded;
            
            // Ресурсы для крафта
            for (const [resourceId, amount] of Object.entries(toolData.resources || {})) {
                if (!result.resources[resourceId]) {
                    result.resources[resourceId] = 0;
                }
                result.resources[resourceId] += amount * taramsNeeded;
            }
            
            // Ресурсы для установки
            for (const [resourceId, amount] of Object.entries(toolData.deploymentCost || {})) {
                if (!result.resources[resourceId]) {
                    result.resources[resourceId] = 0;
                }
                result.resources[resourceId] += amount * taramsNeeded;
            }
            
            // Ресурсы для ремонта (если нужно больше 9 ударов на один таран)
            const hitsPerTaram = Math.min(totalRequired, toolData.maxHits);
            if (totalRequired > toolData.maxHits) {
                const totalRepairs = Math.floor((totalRequired - toolData.maxHits) / toolData.maxHits) + 1;
                if (!result.resources['metal.refined']) {
                    result.resources['metal.refined'] = 0;
                }
                result.resources['metal.refined'] += toolData.repairCost * totalRepairs;
            }
        } else {
            // Обычная обработка для других инструментов
            requiredHits = Math.ceil(targetData.health / damage);
            totalRequired = requiredHits * target.quantity;

            // Добавляем инструменты
            if (!result.tools[tool]) {
                result.tools[tool] = 0;
            }
            result.tools[tool] += totalRequired;

            // Добавляем ресурсы для крафта инструментов
            const toolData = raidTools[tool];
            for (const [resourceId, amount] of Object.entries(toolData.resources || {})) {
                if (!result.resources[resourceId]) {
                    result.resources[resourceId] = 0;
                }
                result.resources[resourceId] += amount * totalRequired;
            }
        }
    }

    // Рассчитываем общие затраты сырья (рекурсивно разворачиваем рецепты)
    function addResourceCost(resourceId, amount, processed = new Set()) {
        // Предотвращаем бесконечную рекурсию
        if (processed.has(resourceId)) {
            if (!result.totalCost[resourceId]) {
                result.totalCost[resourceId] = 0;
            }
            result.totalCost[resourceId] += amount;
            return;
        }
        
        processed.add(resourceId);
        const resourceData = resources[resourceId];
        
        if (resourceData && resourceData.recipe) {
            // Разворачиваем рецепт
            for (const [baseResource, baseAmount] of Object.entries(resourceData.recipe)) {
                addResourceCost(baseResource, baseAmount * amount, new Set(processed));
            }
        } else {
            // Базовый ресурс
            if (!result.totalCost[resourceId]) {
                result.totalCost[resourceId] = 0;
            }
            result.totalCost[resourceId] += amount;
        }
    }
    
    for (const [resourceId, amount] of Object.entries(result.resources)) {
        addResourceCost(resourceId, amount);
    }

    return result;
}
