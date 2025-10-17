export class ArrayTransformer {
    constructor(target) {
        this.target = target;
        // 对于0-5的目标，仍然使用模6
        if (target >= 0 && target <= 5) {
            this.target = target % 6;
        }
        // 目标6表示所有元素互不相同
    }

    /**
     * 检查是否达到目标状态
     */
    isTargetState(array) {
        if (this.target === 6) {
            // 目标6：检查所有元素是否互不相同
            return this.areAllElementsUnique(array);
        } else {
            // 目标0-5：检查所有元素是否等于目标值
            return array.every(num => num === this.target);
        }
    }

    /**
     * 检查数组所有元素是否互不相同
     */
    areAllElementsUnique(array) {
        const seen = new Set();
        for (const num of array) {
            if (seen.has(num)) {
                return false;
            }
            seen.add(num);
        }
        return true;
    }

    /**
     * 执行奇数步操作
     */
    performOddStep(array, index) {
        const newArray = [...array];

        // 选定元素+1
        newArray[index] = (newArray[index] + 1) % 6;

        // 相邻元素-1
        if (index > 0) {
            newArray[index - 1] = (newArray[index - 1] - 1 + 6) % 6;
        }
        if (index < 5) {
            newArray[index + 1] = (newArray[index + 1] - 1 + 6) % 6;
        }

        return newArray;
    }

    /**
     * 执行偶数步操作
     */
    performEvenStep(array, index) {
        const newArray = [...array];
        newArray[index] = (newArray[index] + 1) % 6;
        return newArray;
    }

    /**
     * 将数组状态转换为字符串，用于哈希比较
     */
    stateToString(array) {
        return array.join(',');
    }

    /**
     * 寻找最短变换路径
     */
    findShortestPath(initialArray, step = 1) {
        // 验证输入
        if (initialArray.length !== 6 || !initialArray.every(num => num >= 0 && num <= 5)) {
            throw new Error('数组必须是6位，且每个元素在0-5之间');
        }

        // 如果已经是目标状态
        if (this.isTargetState(initialArray)) {
            return {
                steps: 0,
                path: [],
                states: [initialArray]
            };
        }

        const visited = new Set();
        const queue = [{
            array: initialArray,
            stepCount: step, // 从指定步数开始
            path: []
        }];

        visited.add(this.stateToString(initialArray));

        while (queue.length > 0) {
            const current = queue.shift();

            // 尝试所有可能的操作位置
            for (let i = 0; i < 6; i++) {
                let newArray;

                if (current.stepCount % 2 === 1) {
                    // 奇数步操作
                    newArray = this.performOddStep(current.array, i);
                } else {
                    // 偶数步操作
                    newArray = this.performEvenStep(current.array, i);
                }

                const newStateString = this.stateToString(newArray);

                // 如果达到目标状态
                if (this.isTargetState(newArray)) {
                    const fullPath = [...current.path, i];
                    return this.reconstructSolution(initialArray, fullPath);
                }

                // 如果未访问过，加入队列
                if (!visited.has(newStateString)) {
                    visited.add(newStateString);
                    queue.push({
                        array: newArray,
                        stepCount: current.stepCount + 1,
                        path: [...current.path, i]
                    });
                }
            }
        }

        return null; // 无解
    }

    /**
     * 重构解决方案，包含所有中间状态
     */
    reconstructSolution(initialArray, path) {
        const states = [initialArray];
        let currentArray = [...initialArray];

        for (let i = 0; i < path.length; i++) {
            const stepIndex = path[i];
            if ((i + 1) % 2 === 1) {
                currentArray = this.performOddStep(currentArray, stepIndex);
            } else {
                currentArray = this.performEvenStep(currentArray, stepIndex);
            }
            states.push([...currentArray]);
        }

        return {
            steps: path.length,
            path,
            states
        };
    }

    /**
     * 打印解决方案
     */
    static printSolution(solution, target) {
        console.log(`目标值: ${target}`);
        console.log(`总步数: ${solution.steps}`);
        console.log('变换路径:');

        solution.states.forEach((state, index) => {
            if (index === 0) {
                console.log(`初始状态: [${state.join(', ')}]`);
            } else {
                const stepType = index % 2 === 1 ? '奇数步' : '偶数步';
                const operationIndex = solution.path[index - 1];
                console.log(`第${index}步 (${stepType}, 操作位置${operationIndex}): [${state.join(', ')}]`);
            }
        });
    }
}
