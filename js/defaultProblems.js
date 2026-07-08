/**
 * 默认题目数据 - 包含所有题目的题解
 * 来源：XMUOJ | 2026年程序设计实践例题(05李胜睿班)
 */

function getDefaultProblems() {
    return [
        // ==================== 入门 ====================
        {
            id: 1,
            title: "A+B 问题",
            tags: ["入门"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
计算两个整数A和B的和。

## 输入格式
一行，两个整数A和B，用空格分隔。A和B的绝对值可能很大。

## 输出格式
一行，一个整数，表示A+B的结果。`,

            explanation_cpp: `## 题目描述
计算两个整数的和。

## 算法思路
这是程序设计中最基础的入门题目。直接读入两个整数，输出它们的和即可。

## 核心知识点
- **输入输出**：使用 \`cin\` 读入数据，\`cout\` 输出结果
- **数据类型**：两个数可能较大，使用 \`long long\` 类型避免溢出
- **基本语法**：这是所有算法题的基础，后续所有题目都建立在此基础上

## 复杂度分析
- 时间复杂度：O(1)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
            code_python: `a, b = map(int, input().split())
print(a + b)`,
            explanation_python: `## 题目描述
计算两个整数的和。

## 算法思路
读入两个整数，输出它们的和。

## 复杂度分析
- 时间复杂度：O(1)
- 空间复杂度：O(1)`,
        },

        // ==================== 二进制 ====================
        {
            id: 2,
            title: "求二进制中1的个数",
            tags: ["二进制"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个整数n，计算其二进制表示中1的个数。

## 输入格式
一行，一个整数n（0 ≤ n ≤ 2³¹-1）。

## 输出格式
一行，一个整数，表示n的二进制表示中1的个数。`,

            explanation_cpp: `## 题目描述
给定一个整数，求其二进制表示中1的个数。

## 算法思路
使用 **lowbit** 技巧快速统计二进制中1的个数。

### lowbit 原理
\`lowbit(x) = x & (-x)\` 可以取出 x 二进制表示中最低位的1及其后面的0组成的数。

在计算机中，负数使用补码表示：\`-x = ~x + 1\`。因此 \`x & (-x)\` 刚好保留了最低位的1。

### 算法步骤
1. 当 n > 0 时循环：
2. 使用 \`n -= lowbit(n)\` 去掉最低位的1
3. 每去掉一个1，计数器加1
4. 最终返回计数

## 复杂度分析
- 时间复杂度：O(k)，其中 k 为二进制中1的个数，最坏 O(log n)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
using namespace std;

int lowbit(int x) {
    return x & (-x);
}

int main() {
    int n;
    cin >> n;
    int cnt = 0;
    while (n) {
        n -= lowbit(n);
        cnt++;
    }
    cout << cnt << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 3,
            title: "二进制中1的最低位位置",
            tags: ["二进制"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
多次查询，每次给定一个整数，输出其二进制表示中最低位1所在的位置（从0开始编号）。

## 输入格式
多行，每行一个整数n（可能有多组测试数据，读到文件末尾结束）。

## 输出格式
对于每个输入的整数，输出一行，一个整数，表示其二进制中最低位1的位置（0-indexed）。`,

            explanation_cpp: `## 题目描述
给定一个整数，求其二进制表示中最低位的1所在的位置（从0开始编号）。

## 算法思路
本题是 lowbit 技巧的进阶应用。

### 核心步骤
1. 使用 \`lowbit(n) = n & (-n)\` 取出最低位的1
2. 计算 \`log2(lowbit(n))\` 得到该位的位置

### 快速求log2
由于 lowbit(n) 一定是2的整数次幂（如1, 2, 4, 8...），可以预先建立一个查找表 \`Log2[]\`，将 lowbit 值直接映射到对应的位置。

具体做法：对于 \`1 << 16 = 65536\` 范围内的所有2的幂，预先计算其log2值存入数组。查询时直接查表即可。

## 复杂度分析
- 时间复杂度：O(1)（查表）
- 空间复杂度：O(2^16)（查找表）`,
            code_cpp: `#include <iostream>
#include <cmath>
using namespace std;

const int MAXN = 1 << 16;
int Log2[MAXN];

int lowbit(int x) {
    return x & (-x);
}

int main() {
    // 预处理log2表
    for (int i = 0; i < 16; i++) {
        Log2[1 << i] = i;
    }

    int n;
    while (cin >> n) {
        int lb = lowbit(n);
        cout << Log2[lb] << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 双指针 ====================
        {
            id: 4,
            title: "两数之和",
            tags: ["双指针"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个整数数组和一个目标值target，找出所有两个不同位置的数之和等于target的数对，输出其下标。

## 输入格式
第一行：两个整数target和n，分别表示目标值和数组长度。
第二行：n个整数，表示数组元素。

## 输出格式
每行两个整数i j，表示a[i] + a[j] = target（i < j）。按i升序输出所有数对。`,

            explanation_cpp: `## 题目描述
给定一个整数数组和一个目标值 target，找出所有两个数之和等于 target 的数对。

## 算法思路
本题有两种解法。

### 方法一：暴力枚举（O(n²)）
双重循环遍历所有数对，检查其和是否等于 target。

### 方法二：排序+双指针（O(n log n)）
1. 先对数组排序
2. 设置两个指针：i 指向开头，j 指向末尾
3. 若 \`a[i] + a[j] == target\`，找到一个解
4. 若 \`a[i] + a[j] < target\`，则 i++（需要更大的数）
5. 若 \`a[i] + a[j] > target\`，则 j--（需要更小的数）

## 核心知识点
双指针是处理有序数组中两数之和问题的经典技巧，将 O(n²) 优化到 O(n)（排序不计入）。

## 复杂度分析
- 暴力枚举：时间 O(n²)，空间 O(1)
- 双指针：时间 O(n log n)（排序）+ O(n)（查找），空间 O(1)`,
            code_cpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int target, n;
    cin >> target >> n;
    int a[10005];
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (a[i] + a[j] == target) {
                cout << i << " " << j << endl;
            }
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 5,
            title: "三数之和",
            tags: ["双指针"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个整数数组和一个目标值target，找出所有三个不同位置的数之和等于target的三元组。需要去重，按字典序输出。

## 输入格式
第一行：两个整数target和n，分别表示目标值和数组长度。
第二行：n个整数，表示数组元素。

## 输出格式
每行三个整数，表示一个和为target的三元组。按字典序排列，不重复输出。`,

            explanation_cpp: `## 题目描述
给定一个整数数组和一个目标值，找出所有三个数之和等于目标值的三元组（要求去重）。

## 算法思路
### 排序+双指针（O(n²)）
1. 对数组排序并去重
2. 固定第一个数 i，问题转化为在 i+1 到 n-1 范围内找两数之和等于 \`target - a[i]\`
3. 用双指针 j, k 在剩余范围内搜索
4. 使用 \`sort()\` + \`unique()\` + \`erase()\` 去重

### 去重技巧
排序后，跳过重复元素确保每个三元组只被计算一次。

## 复杂度分析
- 时间复杂度：O(n²)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int target, n;
    cin >> target >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());
    n = a.size();

    for (int i = 0; i < n; i++) {
        int j = i + 1, k = n - 1;
        while (j < k) {
            int sum = a[i] + a[j] + a[k];
            if (sum == target) {
                cout << a[i] << " " << a[j] << " " << a[k] << endl;
                j++; k--;
            } else if (sum < target) j++;
            else k--;
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 6,
            title: "四数之和",
            tags: ["双指针"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个整数数组和一个目标值target，找出所有四个不同位置的数之和等于target的四元组。需要去重，按字典序输出。

## 输入格式
第一行：两个整数target和n，分别表示目标值和数组长度。
第二行：n个整数，表示数组元素。

## 输出格式
每行四个整数，表示一个和为target的四元组。按字典序排列，不重复输出。`,

            explanation_cpp: `## 题目描述
给定一个整数数组和一个目标值，找出所有四个数之和等于目标值的四元组。

## 算法思路
在三数之和的基础上再加一层循环。

### 排序+双指针（O(n³)）
1. 对数组排序并去重
2. 固定前两个数 i, j，问题转化为在剩余范围内找两数之和
3. 用双指针 k, l 搜索
4. 内层循环中同样需要去重

## 复杂度分析
- 时间复杂度：O(n³)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    int target, n;
    cin >> target >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());
    n = a.size();

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int k = j + 1, l = n - 1;
            while (k < l) {
                int sum = a[i] + a[j] + a[k] + a[l];
                if (sum == target) {
                    cout << a[i] << " " << a[j] << " " << a[k] << " " << a[l] << endl;
                    k++; l--;
                } else if (sum < target) k++;
                else l--;
            }
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 排序 ====================
        {
            id: 7,
            title: "排序考试",
            tags: ["排序"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
多组测试数据，每组先输入n，再输入n个整数。对每组数据从小到大排序后输出。

## 输入格式
第一行：整数T，表示测试数据组数。
接下来T组数据，每组：
第一行：整数n，表示该组数据的元素个数。
第二行：n个整数。

## 输出格式
对于每组数据，输出一行排序后的整数序列，用空格分隔。`,

            explanation_cpp: `## 题目描述
对多组数据进行排序，每组数据包含若干整数。

## 算法思路
直接使用 C++ STL 中的 \`sort()\` 函数进行排序。

### STL sort 简介
\`sort(begin, end)\` 使用的是快速排序、插入排序和堆排序的混合算法（内省排序），平均时间复杂度 O(n log n)，在实际应用中非常高效。

### 算法步骤
1. 读入测试用例数 T
2. 对每组数据读入 n 和 n 个整数
3. 调用 \`sort()\` 排序
4. 输出排序结果

## 复杂度分析
- 时间复杂度：O(n log n) 每组
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        sort(a.begin(), a.end());
        for (int i = 0; i < n; i++) {
            if (i) cout << " ";
            cout << a[i];
        }
        cout << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 8,
            title: "大数排序",
            tags: ["排序"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
输入n个整数，使用快速排序（三数取中法选择枢轴）将数组从小到大排序后输出。

## 输入格式
第一行：整数n，表示元素个数。
第二行：n个整数（数据规模较大，需要使用快速排序）。

## 输出格式
一行，n个排序后的整数，用空格分隔。`,

            explanation_cpp: `## 题目描述
对大量整数进行排序，数据规模较大。

## 算法思路
手写**快速排序**算法，使用三数取中法选择枢轴（pivot）来避免最坏情况。

### 快速排序核心
1. **选择枢轴**：取左端、中间、右端三个元素的中位数作为 pivot
2. **划分**：将小于 pivot 的元素放左边，大于的放右边
3. **递归**：对左右两部分递归排序

### 优化技巧
- **三数取中**：避免已排序数组导致 O(n²) 退化
- **关闭同步**：\`ios::sync_with_stdio(false)\` 加速输入输出

## 复杂度分析
- 平均时间：O(n log n)
- 最坏时间：O(n²)（三数取中可大幅降低概率）
- 空间复杂度：O(log n)（递归栈）`,
            code_cpp: `#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100005;
int arr[N];

// 三数取中
int medianOfThree(int a, int b, int c) {
    if ((a <= b && b <= c) || (c <= b && b <= a)) return b;
    if ((b <= a && a <= c) || (c <= a && a <= b)) return a;
    return c;
}

void quickSort(int left, int right) {
    if (left >= right) return;
    int pivot = medianOfThree(arr[left], arr[(left+right)/2], arr[right]);
    int i = left, j = right;
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) swap(arr[i++], arr[j--]);
    }
    quickSort(left, j);
    quickSort(i, right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> arr[i];
    quickSort(0, n - 1);
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 9,
            title: "输出前k大的数",
            tags: ["排序"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定n个整数，输出其中最大的k个数（从大到小排序）。

## 输入格式
第一行：两个整数n和k（1 ≤ k ≤ n ≤ 100000）。
第二行：n个整数。

## 输出格式
一行，k个整数，从大到小排列，用空格分隔。`,

            explanation_cpp: `## 题目描述
给定 n 个整数，输出其中最大的 k 个数（从大到小排序）。

## 算法思路
修改快速排序，使其按**降序**排列。

### 方法一：降序快排
将快排的比较逻辑反转：大于 pivot 的放左边，小于的放右边。排序后输出前k个。

### 方法二：快速选择（更优）
使用 **QuickSelect** 算法（见"快速选择第k个数"），但本题直接排序后取前k个已经足够。

## 复杂度分析
- 快排+取前k：时间 O(n log n)，空间 O(log n)
- QuickSelect：时间 O(n) 期望`,
            code_cpp: `#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100005;
int arr[N];

void quickSortDesc(int left, int right) {
    if (left >= right) return;
    int pivot = arr[(left + right) / 2];
    int i = left, j = right;
    while (i <= j) {
        while (arr[i] > pivot) i++;
        while (arr[j] < pivot) j--;
        if (i <= j) swap(arr[i++], arr[j--]);
    }
    quickSortDesc(left, j);
    quickSortDesc(i, right);
}

int main() {
    ios::sync_with_stdio(false);
    int n, k;
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> arr[i];
    quickSortDesc(0, n - 1);
    for (int i = 0; i < k; i++) {
        if (i) cout << " ";
        cout << arr[i];
    }
    cout << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 10,
            title: "归并排序",
            tags: ["排序"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
使用归并排序算法对n个整数进行排序。

## 输入格式
第一行：整数n，表示元素个数。
第二行：n个整数。

## 输出格式
一行，n个排序后的整数，用空格分隔。`,

            explanation_cpp: `## 题目描述
使用归并排序对数组进行排序。

## 算法思路
**归并排序**是经典的分治算法，核心思想是"先分后合"。

### 算法步骤
1. **分割**：将数组从中间分成左右两部分，递归地对两部分排序
2. **合并**：将两个有序子数组合并成一个有序数组

### 合并过程
使用两个指针分别指向左右子数组的开头，每次取较小的元素放入临时数组。最后将临时数组复制回原数组。

### 特点
- 稳定排序（相等元素保持原有顺序）
- 天然适合求**逆序对**（见下一题）
- 需要 O(n) 额外空间

## 复杂度分析
- 时间复杂度：O(n log n)（稳定）
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 100005;
int arr[N], temp[N];

void mergeSort(int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid + 1, right);

    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (i = left; i <= right; i++) arr[i] = temp[i];
}

int main() {
    ios::sync_with_stdio(false);
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> arr[i];
    mergeSort(0, n - 1);
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 11,
            title: "求排列的逆序对",
            tags: ["排序"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个由1~n组成的排列，求其中逆序对的总数。逆序对指满足i < j且a[i] > a[j]的数对(i, j)。

## 输入格式
第一行：整数n，表示排列长度。
第二行：n个整数，为1~n的一个排列。

## 输出格式
一行，一个整数，表示逆序对的总数。`,

            explanation_cpp: `## 题目描述
求一个排列中逆序对的数量。逆序对指满足 i < j 且 a[i] > a[j] 的数对。

## 算法思路
在**归并排序**的合并过程中统计逆序对。

### 核心原理
在合并两个有序子数组时：
- 当左子数组的 \`arr[i] > arr[j]\` 时
- 由于左子数组有序，arr[i] 到 arr[mid] 的所有元素都大于 arr[j]
- 贡献 \`mid - i + 1\` 个逆序对

### 算法步骤
1. 递归左右两边，各自统计内部的逆序对
2. 在合并过程中统计跨左右两边的逆序对
3. 总数 = 左边内部 + 右边内部 + 跨越两边

## 复杂度分析
- 时间复杂度：O(n log n)
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 100005;
int arr[N], temp[N];
long long ans = 0;

void mergeSort(int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(left, mid);
    mergeSort(mid + 1, right);

    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else {
            temp[k++] = arr[j++];
            ans += mid - i + 1;  // 统计逆序对
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (i = left; i <= right; i++) arr[i] = temp[i];
}

int main() {
    ios::sync_with_stdio(false);
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> arr[i];
    mergeSort(0, n - 1);
    cout << ans << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 12,
            title: "快速选择第k个数",
            tags: ["排序"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
在无序数组中找出第k小的数（使用快速选择算法，不需要完全排序）。

## 输入格式
第一行：两个整数n和k（1 ≤ k ≤ n ≤ 100000）。
第二行：n个整数。

## 输出格式
一行，一个整数，表示第k小的数。`,

            explanation_cpp: `## 题目描述
在无序数组中找出第 k 小的数。

## 算法思路
使用 **QuickSelect** 算法，基于快速排序的分区思想，但只递归一侧。

### 算法步骤
1. 选择 pivot，将数组分为小于和大于 pivot 的两部分
2. 设左侧有 L 个元素：
   - 若 k <= L，则在左侧递归搜索第 k 小的数
   - 若 k > L，则在右侧递归搜索第 k-L 小的数
3. 只递归一侧，避免了对整个数组排序

### 与快排的区别
快排需要对两侧都递归，QuickSelect 只需要在一侧递归。

## 复杂度分析
- 期望时间：O(n)
- 最坏时间：O(n²)（可通过随机化 pivot 优化）
- 空间复杂度：O(log n)（递归栈）`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 100005;
int arr[N];

int quickSelect(int left, int right, int k) {
    if (left == right) return arr[left];
    int pivot = arr[(left + right) / 2];
    int i = left, j = right;
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        if (i <= j) swap(arr[i++], arr[j--]);
    }
    int leftLen = j - left + 1;
    if (k <= leftLen) return quickSelect(left, j, k);
    else return quickSelect(i, right, k - (i - left));
}

int main() {
    ios::sync_with_stdio(false);
    int n, k;
    cin >> n >> k;
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << quickSelect(0, n - 1, k) << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 二分查找 ====================
        {
            id: 13,
            title: "查找指定数",
            tags: ["二分查找"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
在一个已经从小到大排好序的数组中查找指定数值target，输出其下标（若不存在则输出-1）。

## 输入格式
第一行：两个整数n和target，分别表示数组长度和目标值。
第二行：n个排好序的整数（从小到大）。

## 输出格式
一行，一个整数，表示target在数组中的下标（从0开始）。如果不存在则输出-1。`,

            explanation_cpp: `## 题目描述
在一个有序数组中查找指定数值，返回其下标（若不存在返回 -1）。

## 算法思路
**二分查找**是最基础的搜索算法，利用数组的有序性每次排除一半的搜索范围。

### 算法步骤
1. 初始化 left = 0, right = n-1
2. 当 left <= right 时：
   - mid = (left + right) / 2
   - 若 arr[mid] == target，返回 mid
   - 若 arr[mid] < target，说明 target 在右边，left = mid + 1
   - 若 arr[mid] > target，说明 target 在左边，right = mid - 1
3. 循环结束仍未找到，返回 -1

### 注意事项
- **边界条件**：left <= right（而非 left < right）
- **防止溢出**：mid = left + (right - left) / 2

## 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 100005;
int arr[N];

int binarySearch(int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    cin >> n >> target;
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << binarySearch(n, target) << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 14,
            title: "攻击范围",
            tags: ["二分查找"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
在有序数组中查找某个值target的第一次出现和最后一次出现的位置（即该值在数组中的范围）。

## 输入格式
第一行：两个整数n和target，分别表示数组长度和目标值。
第二行：n个排好序的整数（从小到大）。

## 输出格式
一行，两个整数l r，分别表示target第一次和最后一次出现的下标。如果target不存在，则输出"-1 -1"。`,

            explanation_cpp: `## 题目描述
在有序数组中查找某个值的第一次出现和最后一次出现的位置（即值的范围）。

## 算法思路
使用两种不同策略的二分查找：
- **找左边界**：即使找到 target 也继续向左搜索
- **找右边界**：即使找到 target 也继续向右搜索

### 左边界二分
当 arr[mid] == target 时，right = mid（而非返回），继续搜索左侧。

### 右边界二分
当 arr[mid] == target 时，left = mid + 1，继续搜索右侧。

## 复杂度分析
- 时间复杂度：O(log n)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 100005;
int arr[N];

// 找左边界：第一个 >= target 的位置
int bsearch1(int n, int target) {
    int left = 0, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] >= target) right = mid;
        else left = mid + 1;
    }
    return (left < n && arr[left] == target) ? left : -1;
}

// 找右边界：最后一个 <= target 的位置
int bsearch2(int n, int target) {
    int left = 0, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return (left > 0 && arr[left - 1] == target) ? left - 1 : -1;
}

int main() {
    int n, target;
    cin >> n >> target;
    for (int i = 0; i < n; i++) cin >> arr[i];
    int l = bsearch1(n, target);
    int r = bsearch2(n, target);
    if (l == -1) cout << "-1 -1" << endl;
    else cout << l << " " << r << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 15,
            title: "求方程的根",
            tags: ["二分查找"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
求方程 x³ - 5x² + 10x - 80 = 0 在区间[0, 100]上的根。精确到小数点后9位。

## 输入格式
无输入。

## 输出格式
一行，一个浮点数，表示方程的根，保留9位小数。`,

            explanation_cpp: `## 题目描述
求方程 f(x) = x³ - 5x² + 10x - 80 = 0 在区间 [0, 100] 上的根。

## 算法思路
使用**浮点数二分**求方程的近似根。

### 单调性分析
f'(x) = 3x² - 10x + 10，判别式 Δ = 100 - 120 < 0，故 f'(x) > 0 恒成立，f(x) 在 [0, 100] 上单调递增。

### 算法步骤
1. 设定精度 epsilon = 1e-11
2. 当 right - left > epsilon 时：
   - mid = (left + right) / 2
   - 若 f(mid) == 0，找到精确根
   - 若 f(mid) > 0，根在左边，right = mid
   - 若 f(mid) < 0，根在右边，left = mid
3. 输出近似根

## 复杂度分析
- 时间复杂度：O(log((b-a)/ε)) ≈ O(log 1e13) ≈ O(43)
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

double f(double x) {
    return x * x * x - 5 * x * x + 10 * x - 80;
}

int main() {
    double left = 0, right = 100;
    double eps = 1e-11;
    while (right - left > eps) {
        double mid = (left + right) / 2;
        if (f(mid) == 0) {
            left = right = mid;
            break;
        } else if (f(mid) > 0) {
            right = mid;
        } else {
            left = mid;
        }
    }
    cout << fixed << setprecision(9) << left << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 16,
            title: "数的三次方根",
            tags: ["二分查找"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个数n（-10000 ≤ n ≤ 10000），求其三次方根。结果保留6位小数。

## 输入格式
一行，一个浮点数n。

## 输出格式
一行，一个浮点数，表示n的三次方根，保留6位小数。`,

            explanation_cpp: `## 题目描述
给定一个数 n（-10000 ≤ n ≤ 10000），求其三次方根。

## 算法思路
浮点数二分查找，注意处理负数。

### 关键点
- 搜索范围：[-100, 100]（因为 100³ = 10⁶ > 10000）
- 若 mid³ > n，right = mid；否则 left = mid
- 需要高精度（1e-10 级别）

### 注意
负数也有实数三次方根，且单调递增，二分同样适用。

## 复杂度分析
- 时间复杂度：O(log(range/epsilon))
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double n;
    cin >> n;
    double left = -100, right = 100;
    double eps = 1e-10;
    while (right - left > eps) {
        double mid = (left + right) / 2;
        if (mid * mid * mid > n) right = mid;
        else left = mid;
    }
    cout << fixed << setprecision(6) << left << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 17,
            title: "最小预算值",
            tags: ["二分查找"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定n个开销值，需要将它们分成最多m组（每组中的元素是连续的），每组总开销不能超过预算值。求最小的可能预算值。

## 输入格式
第一行：两个整数n和m（1 ≤ m ≤ n ≤ 100000）。
第二行：n个整数，表示每个项目所需的开销。

## 输出格式
一行，一个整数，表示最小的可能预算值。`,

            explanation_cpp: `## 题目描述
给定 n 个开销，需要分成最多 m 组（每组连续），每组的总开销不能超过预算值。求最小的预算值。

## 算法思路
**二分答案**：在可能的预算范围内二分搜索，check(mid) 判断当前预算是否可行。

### 判断函数 check(budget)
1. 从左到右遍历开销
2. 累计当前组的和，若加上当前元素超过 budget，则新开一组
3. 若组数 > m，则 budget 不可行

### 二分范围
left = max(单个开销)，right = sum(所有开销)

## 复杂度分析
- 时间复杂度：O(n log(sum))
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100005;
int a[N];
int n, m;

bool check(int budget) {
    int groups = 1, sum = 0;
    for (int i = 0; i < n; i++) {
        if (sum + a[i] > budget) {
            groups++;
            sum = a[i];
            if (groups > m) return false;
        } else {
            sum += a[i];
        }
    }
    return true;
}

int main() {
    cin >> n >> m;
    int left = 0, right = 0;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        left = max(left, a[i]);
        right += a[i];
    }
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (check(mid)) right = mid;
        else left = mid + 1;
    }
    cout << left << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 18,
            title: "林克的蛋糕",
            tags: ["二分查找"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
有n个圆柱形蛋糕（每个半径为rᵢ，高度均为1）。需要分给f+1个人（包括自己），每人分到一块同样体积的圆柱形蛋糕片（只能从一个蛋糕上切，不能拼接）。求每个人能分到的最大可能的体积。

## 输入格式
第一行：两个整数n和f（1 ≤ n, f ≤ 10000）。
第二行：n个整数，表示每个蛋糕的半径。

## 输出格式
一行，一个浮点数，表示最大可能的体积，保留3位小数。`,

            explanation_cpp: `## 题目描述
有 n 个蛋糕（每个半径为 rᵢ），需要分给 f+1 个人（包括自己），每人一块同样大小的圆柱形蛋糕片。求最大可能的体积。

## 算法思路
**二分答案**——二分搜索每块蛋糕的体积。

### 判断函数 check(vol)
计算每个蛋糕能切出多少块体积为 vol 的蛋糕片：\`count += floor(πr² / vol)\`。若总数 >= f+1，则该体积可行。

### 关键点
- 使用 π = acos(-1.0) 获得高精度
- 二分范围：left = 0, right = max(πr²)
- 精度要求 1e-5

## 复杂度分析
- 时间复杂度：O(n log(maxV/epsilon))
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

const int N = 10005;
const double PI = acos(-1.0);
double area[N];
int n, f;

bool check(double vol) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        cnt += (int)(area[i] / vol);
        if (cnt >= f + 1) return true;
    }
    return false;
}

int main() {
    cin >> n >> f;
    double maxArea = 0;
    for (int i = 0; i < n; i++) {
        int r;
        cin >> r;
        area[i] = PI * r * r;
        maxArea = max(maxArea, area[i]);
    }
    double left = 0, right = maxArea;
    double eps = 1e-5;
    while (right - left > eps) {
        double mid = (left + right) / 2;
        if (check(mid)) left = mid;
        else right = mid;
    }
    cout << fixed << setprecision(3) << left << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 枚举 ====================
        {
            id: 19,
            title: "完美立方",
            tags: ["枚举"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定正整数N（N ≤ 100），找出所有满足a³ = b³ + c³ + d³的四元组(a, b, c, d)，其中1 < b ≤ c ≤ d < a ≤ N。

## 输入格式
一行，一个整数N。

## 输出格式
每行输出一组解，格式为："Cube = a, Triple = (b,c,d)"。按a从小到大，同一a按b从小到大输出。`,

            explanation_cpp: `## 题目描述
给定 N，找出所有满足 a³ = b³ + c³ + d³ 的四元组 (a,b,c,d)，其中 1 < a ≤ N，b ≤ c ≤ d < a。

## 算法思路
**四重循环枚举**所有可能的 a, b, c, d。

### 优化
- b ≤ c ≤ d < a 大幅减少枚举量
- 提前计算立方值存入数组避免重复计算
- 使用 \`long long\` 或 \`int\` 注意范围

## 复杂度分析
- 时间复杂度：O(N⁴)（但约束条件使实际运行量小于理论值）
- 空间复杂度：O(N)（存储立方值）`,
            code_cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int N;
    cin >> N;
    int cube[101];
    for (int i = 1; i <= N; i++) cube[i] = i * i * i;

    for (int a = 2; a <= N; a++) {
        for (int b = 2; b < a; b++) {
            for (int c = b; c < a; c++) {
                for (int d = c; d < a; d++) {
                    if (cube[a] == cube[b] + cube[c] + cube[d]) {
                        cout << "Cube = " << a << ", Triple = ("
                             << b << "," << c << "," << d << ")" << endl;
                    }
                }
            }
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 20,
            title: "人的周期",
            tags: ["枚举"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
人有三个生理周期：体力周期23天、情绪周期28天、智力周期33天。已知每个周期在一年中第几天达到高峰（p, e, i），以及给定的日期d。求下一次三个周期同时达到高峰的日期（即大于d的下一个三高峰同日日期）。

## 输入格式
多组测试数据，每组一行四个整数p e i d。以p=e=i=d=-1结束。
d是给定的日期，可能已经过了p, e, i。

## 输出格式
对于每组数据，输出格式为："Case X: the next triple peak occurs in Y days."`,

            explanation_cpp: `## 题目描述
人有三个周期：体力（23天）、情绪（28天）、智力（33天）。已知每个周期在当前年第几天达到高峰，求下一次三个周期同时达到高峰的日期。

## 算法思路
枚举日期，检查是否同时满足三个周期的峰值条件。

### 优化策略
- 从 d+1 开始搜索
- 不逐天检查，而是利用条件跳步：
  先找到满足体力周期的日期，然后每次加23天来跳过不满足体力周期的日期
- 在体力周期满足的日期中检查情绪和智力周期
- 更进一步：找到体力+情绪的公共周期（LCM或逐步加23），再检查智力

### 条件公式
(k - p) % 23 == 0 && (k - e) % 28 == 0 && (k - i) % 33 == 0

## 复杂度分析
- 暴力枚举：O(21252)
- 跳步优化：O(21252 / 23) ≈ O(924)`,
            code_cpp: `#include <iostream>
using namespace std;

int main() {
    int p, e, i, d;
    int caseNo = 0;
    while (cin >> p >> e >> i >> d) {
        if (p == -1 && e == -1 && i == -1 && d == -1) break;
        caseNo++;
        int k;
        for (k = d + 1; k <= 21252; k++) {
            if ((k - p) % 23 == 0 && (k - e) % 28 == 0 && (k - i) % 33 == 0) {
                break;
            }
        }
        cout << "Case " << caseNo << ": the next triple peak occurs in "
             << k - d << " days." << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 21,
            title: "算术表达式",
            tags: ["枚举"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
计算一个只包含+和*的算术表达式（没有括号）的值，结果对MOD = 1000000007取模。

## 输入格式
一行，一个字符串，表示算术表达式。只包含数字、'+'和'*'，长度不超过1000。

## 输出格式
一行，一个整数，表示表达式的结果对1000000007取模。`,

            explanation_cpp: `## 题目描述
计算只包含 + 和 * 的算术表达式（无括号）的值，结果对 1000000007 取模。

## 算法思路
使用"项（term）"的概念处理乘法的优先级。

### 算法步骤
1. 初始化 ans = 0, term = 0
2. 逐个读入数字和运算符
3. 遇到 + 号：将 term 加入 ans，重置 term
4. 遇到 * 号：term 乘以下一个数（乘法优先级高于加法）
5. 读入结束后将最后一个 term 加入 ans
6. 所有运算在模 MOD 下进行

### 示例
表达式 2+3*4+5：
- 读入2，term=2
- 遇到+，ans=2, term=0
- 读入3，term=3
- 遇到*，读入4，term=3*4=12
- 遇到+，ans=2+12=14, term=0
- 读入5，term=5
- 结束，ans=14+5=19

## 复杂度分析
- 时间复杂度：O(n)，n为表达式长度
- 空间复杂度：O(1)`,
            code_cpp: `#include <iostream>
#include <string>
using namespace std;

const long long MOD = 1000000007;

int main() {
    string s;
    cin >> s;
    long long ans = 0, term = 0, num = 0;
    for (char c : s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + (c - '0');
        } else if (c == '+') {
            term = (term + num) % MOD;
            ans = (ans + term) % MOD;
            term = 0;
            num = 0;
        } else if (c == '*') {
            term = (term + num) % MOD;
            num = 0;
        }
    }
    term = (term + num) % MOD;
    ans = (ans + term) % MOD;
    cout << ans << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 22,
            title: "假币问题",
            tags: ["枚举"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
有12枚硬币，编号为A-L，其中恰好有一枚是假币（可能偏轻或偏重）。通过3次天平称量的结果，找出假币并判断它比真币轻还是重。

## 输入格式
第一行：整数T，表示测试数据组数。
每组数据3行，每行包含左右两端的硬币编号（字符串）和称量结果（"even"表示平衡，"up"表示右端上翘（左重右轻），"down"表示右端下沉（左轻右重））。

## 输出格式
对于每组数据，输出一行，格式为："X is the counterfeit coin and it is light/heavy."`,

            explanation_cpp: `## 题目描述
12枚硬币中有一枚假币（轻或重），通过3次称量找出假币并判断轻重。

## 算法思路
**枚举验证**：枚举每枚硬币是轻假币或重假币（共24种可能），检查哪种假设与三次称量结果一致。

### 称量结果
- "even"：两边平衡
- "up"：右边上翘（左边重或右边轻）
- "down"：右边下沉（左边轻或右边重）

### 验证方法
对每种假设（硬币 X 是轻/重假币），检查三次称量是否都符合。若某种假设通过所有三次检查，即为答案。

## 复杂度分析
枚举 24 种可能，每种检查 3 次称量，总计 O(72) 次操作。`,
            code_cpp: `#include <iostream>
#include <string>
using namespace std;

string leftStr[3], rightStr[3], result[3];

bool check(char coin, bool isLight) {
    for (int i = 0; i < 3; i++) {
        int leftWeight = 0, rightWeight = 0;
        for (char c : leftStr[i]) {
            if (c == coin) leftWeight += (isLight ? -1 : 1);
        }
        for (char c : rightStr[i]) {
            if (c == coin) rightWeight += (isLight ? -1 : 1);
        }
        if (result[i] == "even" && leftWeight != rightWeight) return false;
        if (result[i] == "up" && leftWeight <= rightWeight) return false;
        if (result[i] == "down" && leftWeight >= rightWeight) return false;
    }
    return true;
}

int main() {
    int T;
    cin >> T;
    while (T--) {
        for (int i = 0; i < 3; i++) cin >> leftStr[i] >> rightStr[i] >> result[i];
        for (char c = 'A'; c <= 'L'; c++) {
            if (check(c, true)) {
                cout << c << " is the counterfeit coin and it is light." << endl;
                break;
            }
            if (check(c, false)) {
                cout << c << " is the counterfeit coin and it is heavy." << endl;
                break;
            }
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 23,
            title: "二进制密码锁",
            tags: ["枚举"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
有一排二进制密码按钮（0为关，1为开）。按下一个按钮会同时翻转该按钮及相邻按钮的状态（自己、左边、右边三个按钮0/1反转）。给定初始状态和目标状态两个等长的01字符串，求最少需要按多少次按钮才能使初始状态变为目标状态。如果无法实现，输出"impossible"。

## 输入格式
第一行：一个01字符串，表示初始状态。
第二行：一个01字符串，表示目标状态（与第一行等长，长度不超过30）。

## 输出格式
一行，一个整数，表示最少按键次数。如果无法实现，输出"impossible"。`,

            explanation_cpp: `## 题目描述
一排按钮，按下一个按钮会同时翻转该按钮及相邻按钮的状态。给定初始状态和目标状态，求最少按键次数。

## 算法思路
**枚举第一个按钮的状态**，之后所有按钮的状态都是确定的。

### 关键观察
- 按按钮的顺序无关紧要
- 同一个按钮按两次等于没按
- 确定第一个按钮是否按下后，第二个按钮的唯一正确状态由第一个位置决定（必须使第一个位置匹配目标）

### 算法步骤
1. 枚举第一个按钮的两种情况：按或不按
2. 从第二个按钮开始，根据前一个位置是否匹配目标来决定是否按当前按钮
3. 检查最后一个位置是否匹配目标
4. 取两种情况中按键次数较少的（或都不可行则输出"impossible"）

## 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)（bitset存储状态）`,
            code_cpp: `#include <iostream>
#include <string>
#include <bitset>
#include <algorithm>
using namespace std;

int main() {
    string src, dst;
    cin >> src >> dst;
    int n = src.length();
    int ans = 100;

    // 枚举第一个按钮是否按下
    for (int first = 0; first <= 1; first++) {
        bitset<32> lock(string(src.rbegin(), src.rend()));
        int cnt = 0;
        if (first) {
            lock.flip(0); lock.flip(1);
            cnt++;
        }
        for (int i = 0; i < n - 1; i++) {
            if (lock[i] != (dst[n-1-i] - '0')) {
                lock.flip(i); lock.flip(i+1);
                if (i+2 < n) lock.flip(i+2);
                cnt++;
            }
        }
        if (lock[n-1] == (dst[0] - '0')) ans = min(ans, cnt);
    }
    if (ans == 100) cout << "impossible" << endl;
    else cout << ans << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 24,
            title: "熄灯问题",
            tags: ["枚举"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
一个5×6的灯阵，每个灯有两种状态：1（亮）和0（灭）。按下一盏灯会翻转该灯及上下左右相邻灯的状态（共5盏）。给定初始的灯阵状态，求一种按键方案使得所有灯都熄灭。

## 输入格式
5行，每行6个整数（0或1），表示灯的初始状态。

## 输出格式
5行，每行6个整数（0或1），表示按键方案。1表示需要按下该位置的灯，0表示不按。保证有唯一解。`,

            explanation_cpp: `## 题目描述
5×6的灯阵，按下一盏灯会翻转自身和上下左右相邻灯的状态。求将所有灯熄灭的方案。

## 算法思路
**枚举第一行的按法**，后续各行由上一行确定。

### 关键观察
- 第 i 行的按法完全由第 i-1 行的灯的状态决定（第 i 行必须按那些在第 i-1 行对应位置还亮着的灯的正下方）
- 因此只需枚举第一行的 2⁶ = 64 种按法
- 最后检查最后一行是否全部熄灭

### 算法步骤
1. 枚举行一的所有按法（0到63的二进制表示）
2. 按行一，更新灯的状态
3. 按行二到行五，原则是：第 i 行的按法 = 第 i-1 行剩余亮着的灯的位置
4. 检查行五是否全部熄灭

## 复杂度分析
- 枚举 64 种可能，每种 O(5×6) = O(30)
- 总复杂度 O(64×30) = O(1920)`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

int light[5][6], press[5][6];

bool guess() {
    for (int r = 1; r < 5; r++) {
        for (int c = 0; c < 6; c++) {
            press[r][c] = (light[r-1][c] + press[r-1][c]
                + (c>0?press[r-1][c-1]:0) + (c<5?press[r-1][c+1]:0)
                + (r>1?press[r-2][c]:0)) % 2;
        }
    }
    for (int c = 0; c < 6; c++) {
        if ((light[4][c] + press[4][c]
            + (c>0?press[4][c-1]:0) + (c<5?press[4][c+1]:0)
            + press[3][c]) % 2 != 0) return false;
    }
    return true;
}

int main() {
    for (int i = 0; i < 5; i++)
        for (int j = 0; j < 6; j++)
            cin >> light[i][j];

    for (int firstRow = 0; firstRow < 64; firstRow++) {
        memset(press, 0, sizeof(press));
        for (int c = 0; c < 6; c++)
            press[0][c] = (firstRow >> c) & 1;
        if (guess()) {
            for (int i = 0; i < 5; i++) {
                for (int j = 0; j < 6; j++)
                    cout << press[i][j] << " ";
                cout << endl;
            }
            break;
        }
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 25,
            title: "拨钟问题（暴力枚举）",
            tags: ["枚举"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
有9个时钟排成3×3的矩阵，每个时钟初始指向0、3、6或9点（分别用整数0、3、6、9表示，0表示12点）。有9种拨钟操作，每种操作会让特定的几个时钟顺时针转90°（即+3小时）。求一个操作次数最少的方案，使得所有时钟都指向12点（0点）。

## 输入格式
9个整数（用空格或换行分隔），表示9个时钟的初始状态（0、3、6或9）。

## 输出格式
一行，若干整数，表示需要执行的操作编号（1-9），每个操作可以执行多次，用空格分隔，按字典序（编号从小到大）输出最短的序列。`,

            explanation_cpp: `## 题目描述
9个时钟排成3×3，初始指向不同时刻（0/3/6/9点）。有9种拨钟操作，每种操作会让特定时钟顺时针转90°（即+3小时）。求使所有时钟指向12点的最小操作序列。

## 算法思路
**暴力枚举**所有可能的移动次数组合。

### 核心观察
- 每个操作执行4次等于没执行（360°循环）
- 因此每个操作只需枚举0-3次
- 总共 4⁹ = 262144 种组合

### 算法步骤
1. 用10重循环（实际操作0-9号，0号占位）枚举每种操作的次数
2. 检查当前组合是否使所有时钟归零
3. 记录操作次数最少的方案
4. 按字典序输出

## 复杂度分析
- 枚举量：4⁹ = 262144
- 每次验证：O(9)（时钟数）+ O(9)（操作数）
- 总复杂度：O(262144 × 18) ≈ 4.7×10⁶`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

// affect[i] 表示第i个操作影响的时钟
const int affect[10][4] = {
    {},  // 占位，不使用0号操作
    {1,2,4,5}, {1,2,3}, {2,3,5,6},
    {1,4,7}, {2,4,5,6,8}, {3,6,9},
    {4,5,7,8}, {7,8,9}, {5,6,8,9}
};

int main() {
    int clock[10];
    for (int i = 1; i <= 9; i++) cin >> clock[i];

    int best[10], bestCnt = 100;
    int cnt[10];

    for (cnt[1] = 0; cnt[1] < 4; cnt[1]++)
    for (cnt[2] = 0; cnt[2] < 4; cnt[2]++)
    for (cnt[3] = 0; cnt[3] < 4; cnt[3]++)
    for (cnt[4] = 0; cnt[4] < 4; cnt[4]++)
    for (cnt[5] = 0; cnt[5] < 4; cnt[5]++)
    for (cnt[6] = 0; cnt[6] < 4; cnt[6]++)
    for (cnt[7] = 0; cnt[7] < 4; cnt[7]++)
    for (cnt[8] = 0; cnt[8] < 4; cnt[8]++)
    for (cnt[9] = 0; cnt[9] < 4; cnt[9]++) {
        int temp[10];
        memcpy(temp, clock, sizeof(temp));
        for (int i = 1; i <= 9; i++) {
            for (int j = 0; j < 4 && affect[i][j]; j++) {
                temp[affect[i][j]] = (temp[affect[i][j]] + 3 * cnt[i]) % 12;
            }
        }
        bool ok = true;
        for (int i = 1; i <= 9; i++) {
            if (temp[i] != 0) { ok = false; break; }
        }
        if (ok) {
            int total = 0;
            for (int i = 1; i <= 9; i++) total += cnt[i];
            if (total < bestCnt) {
                bestCnt = total;
                memcpy(best, cnt, sizeof(cnt));
            }
        }
    }

    for (int i = 1; i <= 9; i++) {
        for (int j = 0; j < best[i]; j++) cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 26,
            title: "算24",
            tags: ["枚举", "递归"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定4个整数（1~13），判断能否通过+、-、*、/四则运算（运算过程中允许出现分数，除法需考虑除数为0的情况）得到24。

## 输入格式
一行，4个整数，范围1~13。

## 输出格式
一行，"YES"（能得到24）或"NO"（不能得到24）。`,

            explanation_cpp: `## 题目描述
给定4个整数，判断能否通过 +、-、*、/ 运算得到24（运算过程中允许分数）。

## 算法思路
**递归枚举**所有计算方式。

### 算法步骤
1. 从4个数中选2个，进行6种运算（a+b, a-b, b-a, a*b, a/b, b/a）
2. 将计算结果与剩余2个数合并为3个数
3. 递归处理3个数，直到只剩1个数
4. 检查最后结果是否等于24

### 精度处理
由于浮点数精度问题，使用 \`abs(result - 24) < 1e-6\` 判断等于24。

## 复杂度分析
- 4个数选2个：C(4,2) = 6 种选择
- 每种选择6种运算
- 递归3层
- 总复杂度：O(C(4,2) × 6 × C(3,2) × 6 × C(2,2) × 6) = O(6³ × 3³) = O(5832)`,
            code_cpp: `#include <iostream>
#include <cmath>
#include <vector>
using namespace std;

const double EPS = 1e-6;

bool dfs(vector<double>& nums) {
    int n = nums.size();
    if (n == 1) return fabs(nums[0] - 24) < EPS;

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            vector<double> next;
            for (int k = 0; k < n; k++) {
                if (k != i && k != j) next.push_back(nums[k]);
            }
            double a = nums[i], b = nums[j];
            double ops[] = {a+b, a-b, b-a, a*b, (b!=0?a/b:0), (a!=0?b/a:0)};
            for (double res : ops) {
                next.push_back(res);
                if (dfs(next)) return true;
                next.pop_back();
            }
        }
    }
    return false;
}

int main() {
    vector<double> nums(4);
    for (int i = 0; i < 4; i++) cin >> nums[i];
    cout << (dfs(nums) ? "YES" : "NO") << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 递归 ====================
        {
            id: 27,
            title: "汉诺塔1",
            tags: ["递归"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
经典汉诺塔问题：有A、B、C三根柱子，初始时A柱上有n个大小不同的圆盘，大盘在下，小盘在上。要求将所有圆盘从A柱移动到C柱，每次只能移动一个圆盘，且大盘不能放在小盘上面。输出每一步的移动操作。

## 输入格式
一行，一个整数n（1 ≤ n ≤ 15），表示圆盘数量。

## 输出格式
若干行，每行格式为"X->Y"，表示将一个圆盘从X柱移动到Y柱。`,

            explanation_cpp: `## 题目描述
经典汉诺塔问题：将 n 个盘子从柱子 A 借助柱子 B 移动到柱子 C，大圆盘不能放在小圆盘上面。输出每一步的移动操作。

## 算法思路
**递归分治**。

### 递推思想
1. 将前 n-1 个盘子从 A 移到 B（借助 C）
2. 将第 n 个盘子（最大的）从 A 移到 C
3. 将 n-1 个盘子从 B 移到 C（借助 A）

### 递归边界
n == 1 时，直接将盘子从 A 移到 C。

### 递推公式
f(n) = 2×f(n-1) + 1，因此总步数为 2ⁿ - 1。

## 复杂度分析
- 时间复杂度：O(2ⁿ)（需要输出每一步）
- 空间复杂度：O(n)（递归栈）`,
            code_cpp: `#include <iostream>
using namespace std;

void hanoi(int n, char from, char via, char to) {
    if (n == 1) {
        cout << from << "->" << to << endl;
        return;
    }
    hanoi(n - 1, from, to, via);
    cout << from << "->" << to << endl;
    hanoi(n - 1, via, from, to);
}

int main() {
    int n;
    cin >> n;
    hanoi(n, 'A', 'B', 'C');
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 28,
            title: "汉诺塔二",
            tags: ["递归"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
汉诺塔问题的变种：每个圆盘有唯一编号（编号从1到n，1号盘最大，n号盘最小）。输出每一步移动时被移动盘子的编号和移动路径。

## 输入格式
一行，一个整数n，表示圆盘数量。

## 输出格式
若干行，每行格式为"编号:X->Y"，表示将编号为某值的盘子从X柱移动到Y柱。`,

            explanation_cpp: `## 题目描述
汉诺塔变种：每个盘子有唯一编号，输出每一步移动时盘子的编号和移动路径。

## 算法思路
与汉诺塔1类似，但移动时输出盘子编号。

### 关键点
- 最大的盘子编号为 1（最上面的编号为 n）
- 每次移动底部盘子时，该盘子编号为 \`id + n - 1\`（其中 id 是当前递归的盘子序号）

## 复杂度分析
- 时间复杂度：O(2ⁿ)
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
using namespace std;

void hanoi(int n, int id, char from, char via, char to) {
    if (n == 1) {
        cout << id << ":" << from << "->" << to << endl;
        return;
    }
    hanoi(n - 1, id, from, to, via);
    cout << id + n - 1 << ":" << from << "->" << to << endl;
    hanoi(n - 1, id, via, from, to);
}

int main() {
    int n;
    cin >> n;
    hanoi(n, 1, 'A', 'B', 'C');
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 29,
            title: "分苹果",
            tags: ["递归"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
将n个相同的苹果放入m个相同的盘子中（允许有空盘子），求不同的分配方案总数。

## 输入格式
第一行：整数t，表示测试数据组数。
接下来t行，每行两个整数n和m（0 ≤ n, m ≤ 10）。

## 输出格式
对于每组数据，输出一行，一个整数，表示方案数。`,

            explanation_cpp: `## 题目描述
将 n 个相同的苹果放入 m 个相同的盘子（允许空盘），求方案数。

## 算法思路
**整数划分问题**，使用递归求解。

### 递推关系
设 f(n, m) 为将 n 个苹果放入 m 个盘子的方案数：
- 若 n < m（苹果少于盘子）：f(n, m) = f(n, n)（多余的盘子永远为空）
- 若 n ≥ m：f(n, m) = f(n, m-1) + f(n-m, m)
  - f(n, m-1)：至少有一个盘子为空
  - f(n-m, m)：每个盘子至少有一个苹果（先每个盘子放一个）

### 边界条件
- f(0, m) = 1（没有苹果，只有一种方法——全空）
- f(n, 0) = 0（有苹果但没有盘子，无法分配）

## 复杂度分析
- 时间复杂度：O(n×m)（使用记忆化可避免重复计算）
- 空间复杂度：O(n×m)`,
            code_cpp: `#include <iostream>
using namespace std;

int apple(int n, int m) {
    if (n == 0) return 1;
    if (m == 0) return 0;
    if (n < m) return apple(n, n);
    return apple(n, m - 1) + apple(n - m, m);
}

int main() {
    int t, n, m;
    cin >> t;
    while (t--) {
        cin >> n >> m;
        cout << apple(n, m) << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 30,
            title: "爬天梯",
            tags: ["递归"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
爬n级台阶，每次可以爬1级或2级，求不同的爬法总数。结果对MOD = 1000000007取模。

## 输入格式
一行，一个整数n（0 ≤ n ≤ 100000）。

## 输出格式
一行，一个整数，表示方案数对1000000007取模的结果。`,

            explanation_cpp: `## 题目描述
爬n级台阶，每次可以爬1级或2级，求方案数。

## 算法思路
经典的**斐波那契数列**问题。

### 递推公式
f(n) = f(n-1) + f(n-2)
- f(n-1)：最后一步爬了1级
- f(n-2)：最后一步爬了2级

### 边界条件
f(0) = 1（0级台阶有1种方法：不动）
f(1) = 1
f(2) = 2

### 优化
当 n 很大时，需要使用**记忆化搜索**（动态规划），避免重复计算。可将结果对 MOD = 10⁹+7 取模防止溢出。

## 复杂度分析
- 无优化递归：O(2ⁿ)
- 记忆化/递推：O(n)`,
            code_cpp: `#include <iostream>
using namespace std;

const int MOD = 1000000007;

long long climbStairs(int n) {
    if (n == 0) return 1;
    if (n == 1) return 1;
    long long a = 1, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = (a + b) % MOD;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n;
    cin >> n;
    cout << climbStairs(n) << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 31,
            title: "递归求波兰表达式",
            tags: ["递归"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
计算一个波兰表达式（前缀表达式）的值。运算符包括+、-、*、/，操作数为浮点数。运算符写在操作数前面，不需要括号。

## 输入格式
一行，一个波兰表达式字符串，运算符和操作数之间用空格分隔。

## 输出格式
一行，一个浮点数，表示表达式的计算结果，保留6位小数。`,

            explanation_cpp: `## 题目描述
计算波兰表达式（前缀表达式）的值。运算符在操作数之前。

## 算法思路
利用波兰表达式的**递归定义**来计算：
- 一个数是波兰表达式
- 运算符 + 波兰表达式 + 波兰表达式 也是波兰表达式

### 算法步骤
1. 读入一个token
2. 如果是运算符，递归读入左右两个波兰表达式并计算
3. 如果是数字，直接返回其值

### 递归特性
- 波兰表达式天然适合递归处理
- 不需要括号来确定运算顺序

### 示例
\`+ 2 * 3 4\` = 2 + (3 × 4) = 14

## 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)（递归栈）`,
            code_cpp: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

double polish() {
    string token;
    cin >> token;
    if (token == "+") return polish() + polish();
    if (token == "-") return polish() - polish();
    if (token == "*") return polish() * polish();
    if (token == "/") return polish() / polish();
    return stod(token);
}

int main() {
    cout << fixed << setprecision(6) << polish() << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 32,
            title: "2的幂次方表示",
            tags: ["递归"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
将任意正整数n表示为2的幂次方之和的特殊形式。规则：
- 2⁰用"2(0)"表示
- 2¹用"2"表示
- 2ⁿ（n>1）用"2(...)"表示，其中...是n的2的幂次方表示
- 用"+"连接不同的2的幂次方项，按照指数从大到小排列。
例如：137 = 2(2(2)+2+2(0))+2(2+2(0))+2(0)

## 输入格式
一行，一个正整数n（1 ≤ n ≤ 20000）。

## 输出格式
一行，n的2的幂次方表示。`,

            explanation_cpp: `## 题目描述
将正整数 n 表示为 2 的幂次方之和的形式。例如：137 = 2(2(2)+2+2(0))+2(2+2(0))+2(0)。

## 算法思路
使用递归和**二进制表示**。

### 算法步骤
1. 将 n 转为二进制，找出所有为1的位
2. 对每个为1的位位置（指数），递归表示为2的幂次方形式
3. 特殊情况：2⁰ = 2(0)，2¹ = 2

### 递归出口
- 指数为 0：输出 "2(0)"
- 指数为 1：输出 "2"
- 否则：输出 "2(" + 递归(指数) + ")"

## 复杂度分析
- 时间复杂度：O(log n × log log n)
- 空间复杂度：O(log n)`,
            code_cpp: `#include <iostream>
#include <bitset>
#include <string>
using namespace std;

string solve(int n) {
    if (n == 0) return "0";
    if (n == 1) return "";
    bitset<16> bs(n);
    string res;
    bool first = true;
    for (int i = 15; i >= 0; i--) {
        if (bs[i]) {
            if (!first) res += "+";
            first = false;
            if (i == 0) res += "2(0)";
            else if (i == 1) res += "2";
            else res += "2(" + solve(i) + ")";
        }
    }
    return res;
}

int main() {
    int n;
    cin >> n;
    cout << solve(n) << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 33,
            title: "递归实现指数型枚举",
            tags: ["递归", "深搜DFS"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
从1~n中任选若干个数，输出所有可能的非空子集。

## 输入格式
一行，一个整数n（1 ≤ n ≤ 15）。

## 输出格式
每行输出一个子集，子集中的数字用空格分隔。可以按任意顺序输出，但不能重复。`,

            explanation_cpp: `## 题目描述
从 1~n 中任选若干个数，输出所有可能的非空子集。

## 算法思路
**DFS递归**：每个数有两种选择——选或不选。

### 搜索树
- 每层对应一个数字（1到n）
- 每个节点有两个分支：选当前数字 / 不选当前数字
- 共有 2ⁿ - 1 个非空子集

### 算法步骤
1. DFS(idx)：处理第 idx 个数
2. 分支一：不选 idx，直接 dfs(idx+1)
3. 分支二：选 idx，将其加入路径，dfs(idx+1)，回溯时移除

## 复杂度分析
- 时间复杂度：O(2ⁿ)（需要输出所有子集）
- 空间复杂度：O(n)（递归栈+路径数组）`,
            code_cpp: `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> path;
bool used[20];

void dfs(int idx) {
    if (idx > n) {
        if (!path.empty()) {
            for (int x : path) cout << x << " ";
            cout << endl;
        }
        return;
    }
    // 不选
    dfs(idx + 1);
    // 选
    path.push_back(idx);
    dfs(idx + 1);
    path.pop_back();
}

int main() {
    cin >> n;
    dfs(1);
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 34,
            title: "递归实现组合型枚举",
            tags: ["递归", "深搜DFS"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
从1~n中选出恰好m个数，输出所有可能的组合（不考虑顺序，即{1,2}和{2,1}视为同一种组合）。

## 输入格式
一行，两个整数n和m（1 ≤ m ≤ n ≤ 20）。

## 输出格式
每行m个整数，表示一个组合，数字用空格分隔。按字典序输出所有组合。`,

            explanation_cpp: `## 题目描述
从 1~n 中选出 m 个数，输出所有可能的组合。

## 算法思路
DFS + **start参数**控制不重复选择。

### 与指数型枚举的区别
- 组合要求恰好选 m 个
- 使用 start 参数确保从当前位置之后开始选择，避免重复组合（如{1,2}和{2,1}）

### 剪枝优化
若剩余可选数字不足以凑够 m 个，提前返回：
\`if (path.size() + (n - start + 1) < m) return;\`

## 复杂度分析
- 时间复杂度：O(C(n,m))
- 空间复杂度：O(m)（递归深度）`,
            code_cpp: `#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<int> path;

void dfs(int start) {
    if (path.size() == m) {
        for (int x : path) cout << x << " ";
        cout << endl;
        return;
    }
    // 剪枝：剩余数字不够
    if (path.size() + (n - start + 1) < m) return;
    for (int i = start; i <= n; i++) {
        path.push_back(i);
        dfs(i + 1);
        path.pop_back();
    }
}

int main() {
    cin >> n >> m;
    dfs(1);
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 35,
            title: "递归实现排列型枚举",
            tags: ["递归", "深搜DFS"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
输出1~n的所有排列。排列中每个数字恰好出现一次，且顺序不同视为不同排列。

## 输入格式
一行，一个整数n（1 ≤ n ≤ 10）。

## 输出格式
每行n个整数，表示一个排列，数字用空格分隔。按字典序输出所有排列。`,

            explanation_cpp: `## 题目描述
输出 1~n 的所有排列。

## 算法思路
DFS + **used数组**标记已选数字。

### 与组合的区别
- 排列考虑顺序：{1,2}和{2,1}是不同的排列
- 使用 used[] 数组标记哪些数字已使用，而不是 start 参数

### 算法步骤
1. DFS(depth)：当前已选 depth 个数
2. 遍历 1~n，若数字未使用则选中，递归到 depth+1
3. 回溯时取消标记

## 复杂度分析
- 时间复杂度：O(n!)
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> path;
bool used[20];

void dfs() {
    if (path.size() == n) {
        for (int x : path) cout << x << " ";
        cout << endl;
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path.push_back(i);
            dfs();
            path.pop_back();
            used[i] = false;
        }
    }
}

int main() {
    cin >> n;
    dfs();
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },

        // ==================== 深搜DFS ====================
        {
            id: 36,
            title: "林克的命运矩阵",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
林克在一个二维矩阵中，从坐标(0, 50)出发，每次可以向正下方、正左方或正右方移动一步（不能向上移动）。每步只能走到之前没有访问过的格子。林克一共要走n步，问总共有多少种不同的走法。

## 输入格式
一行，一个整数n（1 ≤ n ≤ 20），表示需要走的步数。

## 输出格式
一行，一个整数，表示不同的路径总数。`,

            explanation_cpp: `## 题目描述
林克在一个矩阵中，从(0, 50)出发走n步，每次可以向下、左、右三个方向移动（不能向上走），不能走到已经访问过的格子。求不同的路径总数。

## 算法思路

### 为什么这是DFS问题
本题本质上是在一个二维网格上的搜索问题。从起点出发，每一步有最多3个选择（下、左、右），需要遍历所有的可能性来统计路径总数。这是典型的**回溯搜索**模式——尝试一条路径，走不通就回退，尝试另一条路。

### 方向约束分析
题目规定只能向下、左、右走，**不能向上走**。这个约束非常关键：
- 由于起点在(0, 50)，向下走意味着x坐标增加
- 不能向上走意味着x坐标永远不会减小
- 这天然形成了一个"向下展开"的搜索树，避免了无限循环

三个方向的含义（设当前位置为(x, y)）：
- **向下**：(x+1, y) —— 行数增加
- **向左**：(x, y-1) —— 列数减少
- **向右**：(x, y+1) —— 列数增加

### visited数组防止重复访问
路径不能经过已经访问过的格子，这通过\`visited[x][y]\`布尔数组来保证：
1. 从起点出发时，标记visited[0][50] = true
2. 每一步尝试方向前，检查目标格子!visited[nx][ny]
3. 成功进入格子后标记visited[nx][ny] = true
4. 回溯退出格子时恢复visited[nx][ny] = false

### 递归搜索树

以n=2为例，从(0, 50)出发：

```
                     (0,50) step=0
                    /   |    \
              (1,50) (1,49) (1,51)  step=1  (向下/向左/向右)
              / | \   / | \   / | \
           ...  ...  ...  ...  ...  ...   step=2
```

第一层（step=0→1）：从(0,50)出发，3个方向
- 向下到(1,50)
- 向左到(1,49)
- 向右到(1,51)

第二层（step=1→2）：从每个位置再向3个方向（排除已访问的）

当step == n时，表示走了恰好n步，找到一条合法路径，ans++。

### 算法步骤详解

1. **初始化**：读入n，设置visited[0][50] = true作为起点，调用dfs(0, 50, 0)
2. **递归终止条件**：当step == n时，说明走完了n步，ans++并返回
3. **方向枚举**：遍历三个方向数组dx={1,0,0}, dy={0,-1,1}
4. **合法性检查**：检查目标格子是否未被访问（由于起点x=0且不能向上，越界检查可以简化）
5. **递归与回溯**：标记→递归→取消标记

### 是否可以DP优化？

本题n最大为20，网格大小理论上是(0~20, 30~70)的范围。DFS的复杂度约为O(3ⁿ)，n=20时3²⁰ ≈ 3.5×10⁹，实际因为visited约束会更小但仍然很慢。

实际上本题可以用**动态规划（DP）**优化：由于不能向上走且起点x=0，每次只能向下走（左/右移动不改变行）。对于第step步，可能的y坐标范围是[50-step, 50+step]。可以用DP[step][y]表示走step步到达y列的不同路径数。这样就避免了指数级复杂度。

不过题目要求n≤20，纯DFS回溯在实际运行中可以接受（因为visited数组大幅减少了搜索空间，实际分支数远小于3）。

## 复杂度分析
- 时间复杂度：O(3ⁿ)理论上界，但visited约束使实际搜索空间远小于上界
- 空间复杂度：O(n)（递归深度）
- n=20时，DFS可在合理时间内完成`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

int n, ans = 0;
bool visited[100][100];
int dx[] = {1, 0, 0};   // 下、左、右
int dy[] = {0, -1, 1};

void dfs(int x, int y, int step) {
    if (step == n) {
        ans++;
        return;
    }
    for (int i = 0; i < 3; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (!visited[nx][ny]) {
            visited[nx][ny] = true;
            dfs(nx, ny, step + 1);
            visited[nx][ny] = false;
        }
    }
}

int main() {
    cin >> n;
    visited[0][50] = true;
    dfs(0, 50, 0);
    cout << ans << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 37,
            title: "净化迷雾森林",
            tags: ["深搜DFS"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
给定一个W×H的矩形网格地图，其中：
- '@'是林克的起始位置
- '.'是可通行的空地
- '#'是墙壁（不可通行）
林克从起点出发，每次可以向上、下、左、右四个方向移动。求林克能够到达的格子总数（包括起点所在的位置）。

## 输入格式
多组测试数据，每组：
第一行：两个整数W和H（1 ≤ W, H ≤ 20），分别表示宽度和高度。W=H=0表示输入结束。
接下来H行，每行W个字符，表示地图。

## 输出格式
对于每组数据，输出一行，一个整数，表示可达的格子总数。`,

            explanation_cpp: `## 题目描述
给定一个 W×H 的网格，'@' 是起点，'.' 是可通行区域，'#' 是墙壁。从起点出发计算能到达的格子总数（包括起点）。

## 算法思路
经典的 **Flood Fill（种子填充/泛洪填充）** 算法，使用DFS实现。

### 算法步骤
1. 找到起点 '@'
2. 从起点开始DFS，向四个方向扩展（上下左右）
3. 标记访问过的格子，避免重复计数
4. 统计访问过的格子数量

### 方向数组
(0,1)右, (0,-1)左, (1,0)下, (-1,0)上

## 复杂度分析
- 时间复杂度：O(W×H)——每个格子最多访问一次
- 空间复杂度：O(W×H)`,
            code_cpp: `#include <iostream>
using namespace std;

const int N = 25;
char grid[N][N];
bool visited[N][N];
int w, h;
int dx[] = {0, 0, 1, -1};
int dy[] = {1, -1, 0, 0};

int dfs(int x, int y) {
    visited[x][y] = true;
    int cnt = 1;
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < h && ny >= 0 && ny < w &&
            !visited[nx][ny] && grid[nx][ny] == '.') {
            cnt += dfs(nx, ny);
        }
    }
    return cnt;
}

int main() {
    while (cin >> w >> h && w && h) {
        int sx, sy;
        for (int i = 0; i < h; i++) {
            for (int j = 0; j < w; j++) {
                cin >> grid[i][j];
                visited[i][j] = false;
                if (grid[i][j] == '@') { sx = i; sy = j; grid[i][j] = '.'; }
            }
        }
        cout << dfs(sx, sy) << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 38,
            title: "骑士林克的怜悯",
            tags: ["深搜DFS"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
骑士周游问题（Knight's Tour）：在一个p×q的棋盘上，一匹马从任意一个格子出发，按照国际象棋中马的走法（走"日"字），要求走遍棋盘上的每一个格子恰好一次。如果存在这样的周游路径，按字典序输出访问顺序；如果不存在，输出"impossible"。

## 输入格式
第一行：整数T，表示测试数据组数。
接下来T组数据，每组一行，两个整数p和q（1 ≤ p, q ≤ 26），分别表示棋盘的行数和列数。

## 输出格式
对于每组数据，先输出"Scenario #i:"（i为编号），然后：
- 如果存在周游路径：输出一条路径的格子序列，每个格子用一个大写字母（列号A-Z）后跟一个数字（行号1-26）表示。
- 如果不存在周游路径：输出"impossible"。
每组数据后输出一个空行。`,

            explanation_cpp: `## 题目描述

骑士周游问题（Knight's Tour）：在国际象棋棋盘上，马从任意起点出发，按照马的走法（走"日"字），不重复地访问棋盘上每一个格子恰好一次。如果存在这样的路径，按字典序输出；否则输出"impossible"。

---

## 为什么骑士周游问题很困难？

骑士周游是一个经典的**NP难问题**。在一个p×q的棋盘上，总共有p×q个格子，马在每一步有最多8个可能的移动方向。如果暴力搜索，理论搜索空间是O(8^(p×q))——这是天文数字。

然而，通过**字典序剪枝**和**回溯**策略，我们可以在合理时间内找到解（如果存在的话）。关键在于：
1. **字典序方向**可以让我们在找到第一个解时就得到字典序最小的解
2. 虽然最坏情况仍然很慢，但对于题目范围（p,q ≤ 26）的实际数据，DFS可以在可接受时间内找到解或判断无解

---

## 马的8个移动方向

马走"日"字：横走2格竖走1格，或横走1格竖走2格。共8个方向：

```
方向编号    移动量(dx, dy)    含义
------------------------------------------
0          (-2, -1)        左上远端
1          (-2, +1)        右上远端
2          (-1, -2)        左上近端
3          (-1, +2)        右上近端
4          (+1, -2)        左下近端
5          (+1, +2)        右下近端
6          (+2, -1)        左下远端
7          (+2, +1)        右下远端
```

### 为什么字典序排列方向至关重要？

题目要求按字典序输出。格子的表示方式是：先输出列号（大写字母A-Z），再输出行号（数字1-26）。例如A1、B2、C3等。

字典序的排序规则：先比较列号（字母），再比较行号（数字）。所以：
- A1 < A2 < B1 < B2 < C1 ...

要让DFS找到的第一个完整路径就是字典序最小的路径，方向数组必须按字典序排列。也就是：优先选择能让下一个格子字典序最小的方向。

**按字典序排列的方向数组**（具体顺序取决于行/列的定义）：
```cpp
int dx[] = {-2, -2, -1, -1, 1, 1, 2, 2};
int dy[] = {-1, 1, -2, 2, -2, 2, -1, 1};
```

这个顺序保证了DFS优先尝试列号较小的格子，从而第一个找到的解就是字典序最小的解。

---

## DFS回溯算法详解

### 核心思想

从一个起点出发，使用DFS递归搜索：
1. 每一步枚举8个方向
2. 对于每个方向，检查目标格子是否在棋盘范围内且未被访问过
3. 如果合法，标记该格子，递归进入下一步
4. 如果某条路径无法走完所有格子，回溯（取消标记），尝试其他方向
5. 当step == p×q时，表示所有格子都被访问了一次，找到解

### 算法框架

```
dfs(x, y, step):
    记录路径：pathX[step] = x, pathY[step] = y
    
    if step == p * q:    // 走完了所有格子
        found = true
        return
    
    for i in 0..7:       // 8个方向按字典序枚举
        nx = x + dx[i]
        ny = y + dy[i]
        if 在棋盘内 且 未访问:
            标记 visited[nx][ny] = true
            dfs(nx, ny, step + 1)
            if found: return    // 已找到解，立即返回
            回溯 visited[nx][ny] = false
```

### 为什么可以从(0, 0)出发？

由于棋盘是对称的，且马可以走到任何连通位置，如果存在周游路径，那么一定存在从(0, 0)出发的路径（可以通过循环移位将路径的起点移到(0, 0)）。因此我们只需从(0, 0)开始搜索即可。

---

## 小例子：3×4棋盘的逐步演示

以一个3行4列的棋盘（p=3, q=4）为例，从(0,0)出发：

```
棋盘坐标：
  A B C D
1 . . . .
2 . . . .
3 . . . .

起点(0,0)对应A1
```

Step 1：在(0,0)，8个方向可以到达的合法位置：
- (-2,-1)→ 越界  (-2,1)→ 越界
- (-1,-2)→ 越界  (-1,2)→ ( - , 2) 越界（行<0）
- (1,-2)→ 越界   (1,2)→  (1, 2) ✓ = C2
- (2,-1)→ 越界   (2,1)→  (2, 1) ✓ = B3

按字典序尝试，先C2...

这个过程会一直进行下去，DFS回溯直到找到完整路径或遍历所有可能性。对于3×4的棋盘，存在哈密顿路径，DFS会找到解。

---

## 输出格式说明

找到解后，按照访问顺序转换为指定格式输出：
- pathY存储列索引(0=q-1)，转换为大写字母：'A' + pathY[i]
- pathX存储行索引(0=p-1)，转换为数字：pathX[i] + 1

例如pathX[1]=0, pathY[1]=0 → 输出"A1"

## 复杂度分析

- 最坏时间复杂度：O(8^(p×q))，但在实际运行中，由于约束（不能重复访问、必须在棋盘内），回溯搜索的剪枝效果显著
- 空间复杂度：O(p×q)（visited数组和路径数组）
- 对于p,q ≤ 8的棋盘，DFS通常能在秒级内完成`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

int p, q;
bool visited[30][30];
int pathX[900], pathY[900];
bool found;

int dx[] = {-2, -2, -1, -1, 1, 1, 2, 2};
int dy[] = {-1, 1, -2, 2, -2, 2, -1, 1};

void dfs(int x, int y, int step) {
    if (found) return;
    pathX[step] = x;
    pathY[step] = y;
    if (step == p * q) {
        found = true;
        return;
    }
    for (int i = 0; i < 8; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < p && ny >= 0 && ny < q && !visited[nx][ny]) {
            visited[nx][ny] = true;
            dfs(nx, ny, step + 1);
            visited[nx][ny] = false;
        }
    }
}

int main() {
    int T, caseNo = 0;
    cin >> T;
    while (T--) {
        cin >> p >> q;
        found = false;
        memset(visited, 0, sizeof(visited));
        visited[0][0] = true;
        dfs(0, 0, 1);
        cout << "Scenario #" << ++caseNo << ":" << endl;
        if (found) {
            for (int i = 1; i <= p * q; i++)
                cout << char('A' + pathY[i]) << pathX[i] + 1;
            cout << endl;
        } else {
            cout << "impossible" << endl;
        }
        cout << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 39,
            title: "击杀黄金蛋糕马",
            tags: ["深搜DFS"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
有一块W×H的矩形蛋糕，需要将其切成M块（每次切割必须沿垂直或水平方向切到底，即一刀切穿整块蛋糕）。要求切出来的最大块的面积尽可能小（即最小化最大块的面积）。求这个最小的最大面积值。

## 输入格式
多组测试数据，每组一行三个整数W H M（1 ≤ W, H ≤ 100, 1 ≤ M ≤ 20），W=H=M=0表示输入结束。

## 输出格式
对于每组数据，输出一行，一个整数，表示最小的最大块面积。`,

            explanation_cpp: `## 题目描述

一块W×H的矩形蛋糕需要切成M块。每次切割必须沿垂直或水平方向贯穿整块蛋糕（一刀切到底）。求能使最大块面积最小的切法，输出这个最小最大面积。

---

## 问题分析：为什么需要DP/记忆化搜索？

### 问题的递归性质

切蛋糕是一个**最优子结构**问题。当我们沿着某条线切下第一刀后，原问题分解为两个**完全独立**的子问题：左边（上面）需要切成k块，右边（下面）需要切成M-k块。两个子问题的最优解组合起来就是原问题的最优解。

### 为什么普通DFS不够？

如果纯粹地枚举每次切割的位置和分配给两边的块数，会出现大量的**重叠子问题**——不同切割顺序可能导致相同的子状态。例如：
- 先横切再竖切一个3×4的蛋糕
- 先竖切再横切同一个3×4的蛋糕
两者可能产生相同的子块，但DFS会重复计算。

因此必须使用**记忆化搜索（Memoization）**来存储已经计算过的状态。

---

## 状态定义

定义三维数组：
```
minMax[w][h][m] = 在一个w×h的矩形蛋糕上切出恰好m块时，
                  能使得最大块面积最小的那个值
```

初始化为-1表示未计算。

### 边界条件

1. **m == 1**：只有一块，不需要切。最大块就是整个蛋糕。
   ```
   minMax[w][h][1] = w × h
   ```

2. **w × h < m**：蛋糕的总面积（按单位面积算）小于需要的块数。这是不可能的情况。
   ```
   minMax[w][h][m] = INF  (当 w × h < m)
   ```

---

## 状态转移：两种切割方式

对于状态(w, h, m)，我们需要考虑第一刀的所有可能切法，然后递归求解。

### 垂直切割（竖着切）

沿着x = i (1 ≤ i < w)的位置垂直切下。蛋糕被分为：
- 左半部分：i × h，需要切成k块 (1 ≤ k < m)
- 右半部分：(w-i) × h，需要切成m-k块

对于这个切割方案，**最大块的面积**取决于左右两部分各自的最大块中较大的那个：
```
max(dfs(i, h, k), dfs(w-i, h, m-k))
```

我们要选择所有可能的(i, k)组合中，使得这个最大值最小的方案：
```
best = min(best, max(dfs(i, h, k), dfs(w-i, h, m-k)))
```

枚举范围：
- i 从 1 到 w-1（切割位置）
- k 从 1 到 m-1（分给左边的块数）

### 水平切割（横着切）

沿着y = i (1 ≤ i < h)的位置水平切下。蛋糕被分为：
- 上半部分：w × i，需要切成k块 (1 ≤ k < m)
- 下半部分：w × (h-i)，需要切成m-k块

```
best = min(best, max(dfs(w, i, k), dfs(w, h-i, m-k)))
```

枚举范围：
- i 从 1 到 h-1（切割位置）
- k 从 1 到 m-1（分给上边的块数）

### 对称性优化

由于w和h在状态中是对称的（垂直切和水平切具有对称性），且矩形旋转不影响结果，我们可以利用w ≤ h的对称性在某些实现中减少状态。但在基础实现中简单地枚举所有情况即可。

---

## 递归树示意图

以W=3, H=2, M=3为例：

```
                    dfs(3, 2, 3)
                   /             \
        垂直切(i=1)              垂直切(i=2)         水平切(i=1)
       /    |    \              /    |    \          /    |    \
  k=1:      k=2:           k=1:      k=2:       k=1:      k=2:
max(dfs(1,2,1),  ...     max(dfs(2,2,1),  ...   max(dfs(3,1,1), ...
    dfs(2,2,2))              dfs(1,2,2))              dfs(3,1,2))
    = max(2, ?)              = max(4, ?)              = max(3, ?)
```

最终取所有方案中最小的值。

---

## 时间复杂度详细分析

- **状态总数**：O(W × H × M)，其中W, H ≤ 100, M ≤ 20。最多 100×100×20 = 200,000 个状态。
- **每个状态的计算**：
  - 垂直切割：枚举 O(W × M) 种(i, k)组合
  - 水平切割：枚举 O(H × M) 种(i, k)组合
  - 合计每个状态：O((W+H) × M)
- **总复杂度**：O(W × H × M × (W+H) × M) = O(W×H×M²×(W+H))
  - 最坏情况：100×100×400×200 ≈ 8×10⁸，但由于记忆化大量剪枝，实际运行远小于此值。

---

## 为什么这归类为"DFS"？

虽然核心是DP/记忆化搜索，但实现方式是用DFS递归函数：
1. `dfs(w, h, m)` 递归地求解子问题
2. 记忆化数组 `minMax[w][h][m]` 存储中间结果
3. 本质上是在状态空间中进行深度优先搜索，并使用缓存避免重复

这种"自顶向下"的递归DP也称为记忆化搜索，是DFS的一种重要应用形式。

## 复杂度分析
- 状态数：O(W×H×M)
- 每个状态转移：O(H×M + W×M)
- 总复杂度：O(W×H×M×(W+H+M))
- 实际运行：由于大量状态不合法（w×h<m直接返回INF），搜索空间大幅减少`,
            code_cpp: `#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;

const int INF = 0x3f3f3f3f;
int minMax[105][105][25];

int dfs(int w, int h, int m) {
    if (minMax[w][h][m] != -1) return minMax[w][h][m];
    if (m == 1) return minMax[w][h][m] = w * h;
    if (w * h < m) return minMax[w][h][m] = INF;

    int best = INF;
    // 垂直切
    for (int i = 1; i < w; i++) {
        for (int k = 1; k < m; k++) {
            best = min(best, max(dfs(i, h, k), dfs(w - i, h, m - k)));
        }
    }
    // 水平切
    for (int i = 1; i < h; i++) {
        for (int k = 1; k < m; k++) {
            best = min(best, max(dfs(w, i, k), dfs(w, h - i, m - k)));
        }
    }
    return minMax[w][h][m] = best;
}

int main() {
    memset(minMax, -1, sizeof(minMax));
    int w, h, m;
    while (cin >> w >> h >> m && (w || h || m)) {
        cout << dfs(w, h, m) << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 40,
            title: "英杰们的蛋糕塔",
            tags: ["深搜DFS"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
制作一个N层的圆柱形蛋糕塔。每层是一个圆柱体，从上到下编号为1到N。要求第i+1层的半径和高度都严格大于第i层（即越往下越大）。给定总体积V，求能使蛋糕塔外表面积（不含底面）最小的设计方案，并输出该最小外表面积。如果无法恰好用完体积V，则输出0。

## 输入格式
一行，两个整数N和V（N ≤ 20, V ≤ 100000），分别表示蛋糕塔的层数和所需的总体积。

## 输出格式
一行，一个整数，表示最小的外表面积。如果无法恰好构建，则输出0。

## 说明
- 外表面积 = 所有层的侧面积之和 + 最底层的底面积（πr²被省略，只输出整数部分）
- 所有尺寸均为整数
- 体积公式：V_i = π × r_i² × h_i（π被约去，实际处理时忽略π）`,

            explanation_cpp: `## 题目描述

制作N层圆柱形蛋糕塔（从上到下编号1到N），每层的半径和高度严格递增。给定总体积V，求最小外表面积（侧面积+底面积，π被约去）。

---

## 问题分析：为什么这道题是"难题中的难题"？

这道题是典型的**搜索+剪枝**问题，被公认为程序设计实践中最难的题目之一。N≤20、V≤100000看起来不大，但如果直接枚举每层的半径和高度（各有约√V≈316个选择），理论搜索空间是O(316^(2N))——完全不可行。

解题的关键在于**剪枝策略**的设计。好的剪枝可以将搜索空间从指数级缩减到可接受范围。

---

## 几何基础

对于圆柱体（忽略π）：
- **体积**：V_i = r² × h
- **侧面积**：S_side = 2 × r × h
- **底面积**（仅最底层）：S_bottom = r²
- **总外表面积** = 所有层的侧面积 + 最底层的底面积

**约束条件**（从上到下编号1~N）：
- r_1 < r_2 < ... < r_N（半径递增）
- h_1 < h_2 < ... < h_N（高度递增）

由于是整数，第i层至少有 r_i ≥ i, h_i ≥ i。

---

## DFS搜索策略

### 搜索方向：从底向上
dfs(depth, prevR, prevH, leftV, surArea)：
- depth：当前正在确定的层（从N向下到1）
- prevR, prevH：下一层（更大那层）的半径和高度
- leftV：还需要分配的剩余体积
- surArea：已经累积的表面积

**为什么从底向上搜索？** 因为底层的半径和高度范围最大，先确定底层可以更大程度地约束上层（剪枝更强）。

### 各层半径和高度的枚举范围

**半径 r 的范围**：
- **下界**：depth（第depth层至少有半径depth）
- **上界**：min(prevR - 1, sqrt(leftV))（不能超过下一层的半径，且单层体积不能超过剩余体积）

**高度 h 的范围**：
- **下界**：depth
- **上界**：min(prevH - 1, leftV / r²)（不能超过下一层的高度，且体积约束）

---

## 三大剪枝策略（核心！）

### 剪枝1：可行性剪枝（最小体积和）

预计算 minV[i] = 第1到第i层的最小可能体积之和：
\`\`\`
minV[0] = 0
minV[i] = minV[i-1] + i × i × i  // r=h=i时体积最小
\`\`\`

**剪枝条件**：如果剩余体积 leftV < minV[depth]，即使所有层都取最小体积也用不完，直接返回。
\`\`\`cpp
if (leftV < sumMinV[iFloor-1]) return;
\`\`\`

这是最基本的剪枝，确保后续有"足够的体积可以填"。

### 剪枝2：最优性剪枝（最小侧面积和）

预计算 minS[i] = 第1到第i层的最小可能侧面积之和：
\`\`\`
minS[0] = 0
minS[i] = minS[i-1] + 2 × i × i  // r=h=i时侧面积最小
\`\`\`

**剪枝条件**：当前表面积 + 剩余层的最小侧面积和 ≥ 全局最优解时，剪枝。
\`\`\`cpp
if (surArea + sumMinS[iFloor] >= minsurArea) return;
\`\`\`

### 剪枝3：启发式剪枝（体积-面积转换，最巧妙！）

这是最关键也最巧妙的剪枝。考虑一个问题：**给定体积v，要构成一个圆柱（半径<r_upper），最小的侧面积是多少？**

对于单个圆柱：S = 2rh = 2v/r（因为 v = r²h，所以 h = v/r²，2rh = 2r × v/r² = 2v/r）。在半径尽可能大时，侧面积最小。

**剪枝条件**：用剩余体积能实现的最小侧面积 + 当前表面积 ≥ 全局最优解。
\`\`\`cpp
if (prevR > 1 && 2 * leftV / (prevR - 1) + surArea >= minsurArea) return;
\`\`\`

这里用 prevR-1（上层可能的最大半径）来估算：剩余体积对应的最小可能侧面积是2×leftV/(prevR-1)。如果即使这个"最乐观估计"都已经超了最优解，那这条路就走不通。

### 剪枝的实际效果

三个剪枝协同工作的效果：
1. 剪枝1确保"体积够用"
2. 剪枝2确保"表面积还有希望"
3. 剪枝3提供"剩余体积的最优表面积下界"

这三个剪枝将搜索空间从指数级缩减到可以在毫秒级完成。

---

## 搜索顺序优化

在枚举半径和高度时，从大到小枚举（因为大的半径/高度让剩余体积更少，更容易触发剪枝）。

\`\`\`
for (int r = prevR - 1; r >= depth; r--)  // 从大到小
    for (int h = H_max; h >= depth; h--)   // 从大到小
\`\`\`

---

## 复杂度分析

- 理论搜索空间：O((√V)^(2N)) ≈ O(316^40)，完全不可行
- 实际搜索空间：由于三个剪枝的强力削减，实际递归分支数极少
- 对于N=20, V=100000的极限数据，可在毫秒级完成`,
            code_cpp: `#include <iostream>
#include <cmath>
using namespace std;

#define ButtomArea(r) (r*r) //底面积
#define surArea(r,h) (2*r*h)//侧面积
#define Volume(r,h) ((r)*(r)*(h))//体积
#define V_to_surArea(v,r) (2*v/(r))//体积转侧面积

#define Inf 0x7fffffff

int V,N,minsurArea=Inf;
int sumMinS[27],sumMinV[27];

void dfs(int iFloor,int preR,int preH,int leftV,int surArea){
    if(iFloor==0){
        if(leftV==0&&surArea<minsurArea) minsurArea=surArea;
        return;
    }

    //剪枝1: 剩余体积不够最小体积和
    if(leftV<sumMinV[iFloor-1]) return;

    //剪枝3: 启发式剪枝——剩余体积转侧面积下界
    if(preR>1&&V_to_surArea(leftV,preR-1)+surArea>=minsurArea) return;

    //剪枝2: 累计表面积+最小表面积>=全局最优
    if(surArea+sumMinS[iFloor]>=minsurArea) return;

    for(int r=preR-1;r>=iFloor;r--){
        if(iFloor==N) surArea=ButtomArea(r); //最底层加上底面积

        //确定高度枚举范围的上界
        int H_max=(1.0*leftV/ButtomArea(r))+1; //体积转高度
        if(H_max>preH-1) H_max=preH-1; //高度不能超过上一层

        for(int h=H_max;h>=iFloor;h--){
            int V_i=Volume(r,h);
            if(V_i>leftV) continue;
            dfs(iFloor-1,r,h,leftV-V_i,surArea+surArea(r,h));
        }
    }
}

int main(){
    cin>>V>>N;
    sumMinS[0]=sumMinV[0]=0;

    for(int i=1;i<=N;i++){
        sumMinS[i]=sumMinS[i-1]+surArea(i,i);
        sumMinV[i]=sumMinV[i-1]+Volume(i,i);
    }
    int maxH=(V-sumMinV[N-1])/ButtomArea(N)+1;
    int maxR=sqrt(double((V-sumMinV[N-1])+1));

    minsurArea=Inf;
    dfs(N,maxH,maxR,V,0);

    if(minsurArea==Inf) cout<<0<<endl;
    else cout<<minsurArea<<endl;

    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 41,
            title: "真假记忆碎片",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
验证一个给定的9×9网格是否为合法的数独解。即需要同时满足：
1. 每行、每列、每个3×3小九宫格内的数字都是1~9各出现一次
2. 与给定的原始模板中已经填入的数字保持一致（模板中'?'表示未填）

## 输入格式
前9行：原始数独模板，每行9个字符（数字1-9或'?'表示空格）。
接下来9行：待验证的数独解，每行9个字符（均为数字1-9）。

## 输出格式
一行，"Yes"表示该解合法，"No"表示不合法。`,

            explanation_cpp: `## 题目描述
验证一个9×9网格是否是一个合法的数独解（满足行、列、3×3宫内1-9各出现一次，且与给定模板中的已填数字一致）。

## 算法思路
**模拟验证**，不需要DFS解题。

### 验证条件
1. 只含数字1-9（不能有其他字符）
2. 模板中已填的位置必须保持一致
3. 每行1-9各出现一次
4. 每列1-9各出现一次
5. 每个3×3宫内1-9各出现一次

### 实现方法
使用bool数组标记每行、每列、每宫的数字出现情况。

## 复杂度分析
- 时间复杂度：O(81) = O(1)
- 空间复杂度：O(27) = O(1)`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

char origin[9][9], answer[9][9];

bool check() {
    bool row[9][10] = {0}, col[9][10] = {0}, box[3][3][10] = {0};
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char c = answer[i][j];
            if (c < '1' || c > '9') return false;
            if (origin[i][j] != '?' && origin[i][j] != c) return false;
            int num = c - '0';
            if (row[i][num] || col[j][num] || box[i/3][j/3][num]) return false;
            row[i][num] = col[j][num] = box[i/3][j/3][num] = true;
        }
    }
    return true;
}

int main() {
    for (int i = 0; i < 9; i++) cin >> origin[i];
    for (int i = 0; i < 9; i++) cin >> answer[i];
    cout << (check() ? "Yes" : "No") << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 42,
            title: "找回林克的记忆碎片1",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
标准数独求解问题：给定一个部分填充的9×9数独（用'.'表示空格），求出一个合法的完整解。保证输入数独有唯一解。

## 输入格式
9行，每行9个字符（数字1-9或'.'表示空格）。

## 输出格式
9行，每行9个数字，表示一个合法的数独完整解。`,

            explanation_cpp: `## 题目描述
标准数独求解：给定部分填充的9×9数独，输出一个合法解。

## 算法思路
**DFS + 回溯**，逐格尝试填入1-9。

### 数据结构
- \`row[i][num]\`：第i行是否已有num
- \`col[j][num]\`：第j列是否已有num
- \`box[k][num]\`：第k个3×3宫是否已有num

### 算法步骤
1. 找到下一个空格
2. 尝试填入1-9中满足约束的数字
3. 递归处理下一个空格
4. 若所有约束都不满足，回溯

### 宫编号公式
\`boxIndex = (i/3)*3 + j/3\`

这个公式将9×9的棋盘映射到编号0-8的9个3×3宫：
- 第0宫：行0-2, 列0-2
- 第1宫：行0-2, 列3-5
- ...
- 第8宫：行6-8, 列6-8

## 复杂度分析
- 理论上界：O(9⁸¹)，但约束极大减小搜索空间
- 典型数独可在几百万次尝试内解决`,
            code_cpp: `#include <iostream>
using namespace std;

int board[9][9];
bool row[9][10], col[9][10], box[9][10];

int getBox(int i, int j) { return (i/3)*3 + j/3; }

bool dfs(int idx) {
    if (idx == 81) return true;
    int i = idx / 9, j = idx % 9;
    if (board[i][j] != 0) return dfs(idx + 1);

    int b = getBox(i, j);
    for (int num = 1; num <= 9; num++) {
        if (!row[i][num] && !col[j][num] && !box[b][num]) {
            board[i][j] = num;
            row[i][num] = col[j][num] = box[b][num] = true;
            if (dfs(idx + 1)) return true;
            row[i][num] = col[j][num] = box[b][num] = false;
            board[i][j] = 0;
        }
    }
    return false;
}

int main() {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char c;
            cin >> c;
            board[i][j] = (c == '.' ? 0 : c - '0');
            if (board[i][j]) {
                row[i][board[i][j]] = true;
                col[j][board[i][j]] = true;
                box[getBox(i,j)][board[i][j]] = true;
            }
        }
    }
    dfs(0);
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) cout << board[i][j];
        cout << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 43,
            title: "找回林克的记忆碎片2",
            tags: ["深搜DFS", "二进制"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
数独求解的增强版。与"找回林克的记忆碎片1"相同，需要求解一个9×9数独，但测试数据更强——普通DFS无法在规定时间内完成。需要使用位运算和启发式搜索来优化求解过程。

## 输入格式
9行，每行9个字符（数字1-9或'.'表示空格）。保证输入数独有唯一解。

## 输出格式
9行，每行9个数字，表示数独的完整解。`,

            explanation_cpp: `## 题目描述

数独求解的增强版。与ID 42（基础DFS数独）输入输出格式完全相同，但数据规模更强——普通DFS逐格回溯会超时。需要使用位运算和智能搜索策略优化。

---

## 为什么基础DFS会超时？

回顾ID 42的基础DFS：
```cpp
// 基础DFS: 逐个格子尝试1-9
for (int num = 1; num <= 9; num++) {
    if (!row[i][num] && !col[j][num] && !box[b][num]) {
        // 尝试填入num
    }
}
```

这存在两个性能瓶颈：
1. **候选数枚举效率低**：每个空格都需要遍历1-9检查是否合法 → O(9) per cell
2. **搜索顺序盲目**：按行列顺序填，可能先填候选数很多的格子（分支因子大），导致搜索树膨胀

对于简单的数独（很多已填数字），这些瓶颈不明显。但对于"困难"数独（空格多、候选数多），基础DFS的搜索空间呈指数级增长，会导致TLE。

---

## 优化1：位掩码表示（Bitmask）

### 核心思想

用**9位二进制整数**表示每行/每列/每宫的数字使用情况：

```
位位置:  8   7   6   5   4   3   2   1   0
数字:    9   8   7   6   5   4   3   2   1
```

- 位为1：对应数字**可用**（尚未被使用）
- 位为0：对应数字**不可用**（已被使用）

### 示例

假设第0行已经填了数字1、3、5：

```
位位置:  8 7 6 5 4 3 2 1 0
二进制:  1 1 1 1 0 1 0 1 0 = 0b111101010
数字:    9 8 7 6 5 4 3 2 1   （位0对应数字1，位2对应数字3...）

可用数字: {2, 4, 6, 7, 8, 9}
```

### 状态初始化

```cpp
int row[9], col[9], box[3][3];

// 初始时所有数字都可用
for (int i = 0; i < 9; i++)
    row[i] = col[i] = (1 << 9) - 1;  // 0b111111111 = 511

for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        box[i][j] = (1 << 9) - 1;

// 对于已填数字，从位掩码中移除（将该位置0）
if (board[i][j] != '.') {
    int bit = 1 << (board[i][j] - '1');
    row[i] ^= bit;   // 异或操作：将bit对应的位翻转(1→0)
    col[j] ^= bit;
    box[i/3][j/3] ^= bit;
}
```

### 获取候选数字

对于格子(i, j)，其候选数字为：
```cpp
int state = row[i] & col[j] & box[i/3][j/3];
```
三个位掩码的**按位与（&）**：只有三处都可用的数字才会保留为1。

---

## 优化2：lowbit技术快速枚举候选数

### lowbit原理

```
lowbit(x) = x & (-x)
```

在计算机中，负数用补码表示：-x = ~x + 1。因此x & (-x)提取出x二进制中最低位的1。

例如：state = 0b001010100（数字3, 5, 7可用）

```
state           = 0b001010100
-state          = 0b110101100  (补码)
state & (-state) = 0b000000100  → 提取出第3位（数字3）
```

### 枚举技巧

利用lowbit依次取出每一位：
```cpp
for (int i = state; i; i -= lowbit(i)) {
    int bit = lowbit(i);      // 当前最低位的1
    int num = map[bit];       // 通过查找表获取对应数字(0-8)
    // 尝试填入num+1...
}
```

这样只需要O(k)时间枚举候选数（k为候选数个数），而不是O(9)。

### 查找表map[]

```cpp
int map[1 << 9];  // map[1<<i] = i
// 初始化：
for (int i = 0; i < 9; i++)
    map[1 << i] = i;
```

这样map[0b001000000] = 6，映射回数字7。

### 查找表ones[]

```cpp
int ones[1 << 9];  // ones[state] = state中1的个数（即候选数的个数）
// 初始化：
for (int i = 0; i < (1 << 9); i++) {
    int cnt = 0;
    for (int j = i; j; j -= lowbit(j)) cnt++;
    ones[i] = cnt;
}
```

---

## 优化3：MRV启发式（Minimum Remaining Values）

### 核心思想

每次选择**候选数最少**的空格来填充。这是约束满足问题（CSP）中的经典启发式策略。

**直觉**：候选数少的格子意味着它的取值选择少，更容易确定。优先处理这些格子可以减少搜索树的分支。

### 实现

```cpp
int minV = 10, x, y;
for (int i = 0; i < 9; i++) {
    for (int j = 0; j < 9; j++) {
        if (board[i][j] == '.') {
            int state = get(i, j);  // 获取候选数位掩码
            if (ones[state] < minV) {
                minV = ones[state];
                x = i; y = j;
            }
        }
    }
}
```

找到候选数最少的格子(x, y)后，只在这个格子上尝试填充。这大幅减少了搜索分支。

---

## 完整算法流程

```
预处理：
  1. 构建map[]查找表（位→数字编号）
  2. 构建ones[]查找表（位掩码→1的个数）
  3. 初始化row/col/box位掩码为全1（所有数字可用）
  4. 读入数独，对于已填数字，用异或操作将其从对应位掩码中移除
  5. 统计空格数量cnt

DFS(cnt):  // cnt为剩余空格数
  if cnt == 0: 成功，返回true
  
  1. 使用MRV启发式找到候选数最少的空格(x, y)
  2. 获取该格的候选数位掩码: state = row[x] & col[y] & box[x/3][y/3]
  3. 使用lowbit遍历所有候选数字:
     for (int i = state; i; i -= lowbit(i)):
       bit = lowbit(i)
       num = map[bit]    // 数字编号0-8
       
       填入数字num+1:
         row[x] ^= bit   // 从可用集中移除
         col[y] ^= bit
         box[x/3][y/3] ^= bit
         board[x][y] = num + '1'
       
       if dfs(cnt-1): return true  // 递归
       
       回溯:
         board[x][y] = '.'
         row[x] ^= bit   // 恢复到可用集
         col[y] ^= bit
         box[x/3][y/3] ^= bit
  
  4. return false  // 所有候选数都失败
```

---

## 与基础DFS（ID 42）的对比

| 方面 | 基础DFS (ID 42) | 位运算DFS (ID 43) |
|------|-----------------|-------------------|
| 状态表示 | bool row[9][10] | int row[9] (9-bit) |
| 候选数获取 | 遍历1-9逐一检查 | row[i] & col[j] & box[k]，O(1) |
| 候选数枚举 | 遍历1-9，O(9) | lowbit遍历，O(k) |
| 搜索顺序 | 顺序填 (idx 0→80) | MRV启发式（最少候选优先） |
| 空间占用 | 9×10×3 = 270 bool | 9×3 = 27 int |
| 速度 | 困难数独可能TLE | 所有合法数独秒出 |

---

## 复杂度分析
- 理论上界：依然是O(9ⁿ)，n为空格的个数
- 实际性能：MRV启发式 + 位运算优化使搜索空间缩小数个数量级。即使是"世界最难数独"也能在毫秒内求解
- 空间：O(1)（常数级，固定9×9棋盘）`,
            code_cpp: `#include <iostream>
#include <algorithm>
using namespace std;

const int N = 9;
int row[N], col[N], box[3][3];
int ones[1 << N], map[1 << N];
char board[N][N + 1];

int lowbit(int x) { return x & -x; }

int get(int i, int j) { return row[i] & col[j] & box[i/3][j/3]; }

bool dfs(int cnt) {
    if (cnt == 0) return true;

    // 找候选数最少的位置
    int minV = 10, x, y;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (board[i][j] == '.') {
                int state = get(i, j);
                if (ones[state] < minV) {
                    minV = ones[state];
                    x = i; y = j;
                }
            }
        }
    }

    int state = get(x, y);
    for (int i = state; i; i -= lowbit(i)) {
        int bit = lowbit(i);
        int num = map[bit];
        row[x] ^= bit; col[y] ^= bit; box[x/3][y/3] ^= bit;
        board[x][y] = num + '1';
        if (dfs(cnt - 1)) return true;
        board[x][y] = '.';
        row[x] ^= bit; col[y] ^= bit; box[x/3][y/3] ^= bit;
    }
    return false;
}

int main() {
    // 预处理
    for (int i = 0; i < N; i++) map[1 << i] = i;
    for (int i = 0; i < (1 << N); i++) {
        int s = 0;
        for (int j = i; j; j -= lowbit(j)) s++;
        ones[i] = s;
    }

    for (int i = 0; i < N; i++) {
        row[i] = col[i] = (1 << N) - 1;
        for (int j = 0; j < 3; j++) box[i/3*3 + j/3][i%3*3 + j%3] = 0;
    }
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            box[i][j] = (1 << N) - 1;

    int cnt = 0;
    for (int i = 0; i < N; i++) {
        cin >> board[i];
        for (int j = 0; j < N; j++) {
            if (board[i][j] != '.') {
                int bit = 1 << (board[i][j] - '1');
                row[i] ^= bit; col[j] ^= bit; box[i/3][j/3] ^= bit;
            } else {
                cnt++;
            }
        }
    }
    dfs(cnt);
    for (int i = 0; i < N; i++) cout << board[i] << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 44,
            title: "DFS试炼之排列数字",
            tags: ["深搜DFS"],
            difficulty: "低",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
输出1~n的所有排列（与排列型枚举相同）。每个排列中的数字用空格分隔，每个排列占一行。

## 输入格式
一行，一个整数n（1 ≤ n ≤ 9）。

## 输出格式
每行n个整数，表示一个排列，按字典序输出所有排列。`,

            explanation_cpp: `## 题目描述
输出 1~n 的所有排列（与排列型枚举相同）。

## 算法思路
DFS + used数组标记。见"递归实现排列型枚举"。

## 复杂度分析
- 时间复杂度：O(n!)
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
using namespace std;

int n, path[10];
bool used[10];

void dfs(int depth) {
    if (depth == n) {
        for (int i = 0; i < n; i++) cout << path[i] << " ";
        cout << endl;
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (!used[i]) {
            used[i] = true;
            path[depth] = i;
            dfs(depth + 1);
            used[i] = false;
        }
    }
}

int main() {
    cin >> n;
    dfs(0);
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 45,
            title: "DFS试炼之n皇后问题",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
在N×N的国际象棋棋盘上放置N个皇后，使得它们互不攻击。皇后可以攻击同一行、同一列以及同一对角线上的棋子。输出所有可行的放置方案。

## 输入格式
一行，一个整数N（1 ≤ N ≤ 20），表示棋盘大小和皇后数量。

## 输出格式
每行N个整数，表示一种方案中每行皇后所在的列号（从1开始编号）。按字典序输出所有方案。`,

            explanation_cpp: `## 题目描述
在 N×N 的棋盘上放置 N 个皇后，使它们互不攻击（不同行、列、对角线）。输出所有可行方案。

## 算法思路
DFS + 对角线约束优化。

### 约束条件
- 每行一个皇后（逐行搜索）
- 列不能重复：\`col[j]\`
- 主对角线不能重复：\`dg[i+j]\`（i+j为常数）
- 副对角线不能重复：\`udg[i-j+N]\`（i-j+N为常数，避免负下标）

### 对角线性质
- 同一主对角线上的格子 i+j 恒定（左上→右下方向）
- 同一副对角线上的格子 i-j 恒定（右上→左下方向）

### 为什么逐行放置
因为每行只能有一个皇后（否则同行攻击），所以我们可以逐行放置第0行到第N-1行的皇后。对于第row行，只需要确定皇后在哪一列。这样搜索空间从N²选N个格子变成了N!种排列。

## 复杂度分析
- 时间复杂度：O(N!)（N皇后无多项式解）
- 空间复杂度：O(N)`,
            code_cpp: `#include <iostream>
using namespace std;

int n, ans = 0;
int pos[20];
bool col[20], dg[40], udg[40];

void dfs(int row) {
    if (row == n) {
        for (int i = 0; i < n; i++) cout << pos[i] + 1 << " ";
        cout << endl;
        return;
    }
    for (int j = 0; j < n; j++) {
        if (!col[j] && !dg[row + j] && !udg[row - j + n]) {
            col[j] = dg[row + j] = udg[row - j + n] = true;
            pos[row] = j;
            dfs(row + 1);
            col[j] = dg[row + j] = udg[row - j + n] = false;
        }
    }
}

int main() {
    cin >> n;
    dfs(0);
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 46,
            title: "字符全排列",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
输入一个字符串（可能包含重复字符），输出其所有字符的全排列。要求按字典序输出，并且去重（相同的排列只输出一次）。

## 输入格式
一行，一个字符串，长度不超过8。

## 输出格式
每行一个字符串，表示字符的一个排列。按字典序输出所有不同的排列。`,

            explanation_cpp: `## 题目描述
输入一个字符串，输出其所有字符的全排列（按字典序，去重）。

## 算法思路
DFS + used标记 + **排序去重**。

### 算法步骤
1. 对输入字符串排序（保证字典序）
2. 使用DFS生成排列
3. 对于重复字符，通过排序后检查前后是否相同来避免重复输出

### 去重技巧
排序后，若 \`s[i] == s[i-1] && !used[i-1]\` 则跳过（该层次已经处理过相同字符）。

**为什么这个条件能去重？**
当有重复字符时（如"aab"），排序后相同字符相邻。在DFS的同一层，如果前一个相同字符还没被使用（!used[i-1]），说明这个位置的搜索已经在前一个相同字符处做过，当前字符会产生完全相同的排列，因此跳过。

## 复杂度分析
- 时间复杂度：O(n!)，去重后数量减少
- 空间复杂度：O(n)`,
            code_cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

string s, path;
bool used[10];

void dfs() {
    if (path.length() == s.length()) {
        cout << path << endl;
        return;
    }
    for (int i = 0; i < s.length(); i++) {
        if (used[i]) continue;
        if (i > 0 && s[i] == s[i-1] && !used[i-1]) continue;
        used[i] = true;
        path.push_back(s[i]);
        dfs();
        path.pop_back();
        used[i] = false;
    }
}

int main() {
    cin >> s;
    sort(s.begin(), s.end());
    dfs();
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 47,
            title: "输出N皇后的全部摆法",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
输出N皇后问题的所有解的完整信息：每行输出该行皇后所在的列号。

## 输入格式
一行，一个整数N（1 ≤ N ≤ 20）。

## 输出格式
对于每种合法的摆法，输出N个整数，每个整数表示该行皇后所在的列号（1~N）。每种方案占一行，按字典序输出。`,

            explanation_cpp: `## 题目描述
输出N皇后问题的所有解的完整棋盘布局。

## 算法思路
与"DFS试炼之n皇后问题"相同，只是输出格式不同——输出每行皇后所在的列号。

### 输出格式
每行一个整数，表示该行皇后所在的列号（从1开始）。

## 复杂度分析
- 时间复杂度：O(N!)
- 空间复杂度：O(N)`,
            code_cpp: `#include <iostream>
using namespace std;

int n, pos[20];
bool col[20], dg[40], udg[40];

void dfs(int row) {
    if (row == n) {
        for (int i = 0; i < n; i++) cout << pos[i] + 1 << " ";
        cout << endl;
        return;
    }
    for (int j = 0; j < n; j++) {
        if (!col[j] && !dg[row + j] && !udg[row - j + n]) {
            pos[row] = j;
            col[j] = dg[row + j] = udg[row - j + n] = true;
            dfs(row + 1);
            col[j] = dg[row + j] = udg[row - j + n] = false;
        }
    }
}

int main() {
    cin >> n;
    dfs(0);
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 48,
            title: "求八皇后的第n种解",
            tags: ["深搜DFS"],
            difficulty: "中",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
8皇后问题共有92种解。预先计算出所有92种解并按字典序排列，对于每次查询，输出第n种解的完整棋盘布局（用每行皇后所在列号表示）。

## 输入格式
多组查询，每组一行一个整数n（1 ≤ n ≤ 92）。

## 输出格式
对于每次查询，输出一行8个数字，表示第n种解中每行皇后所在的列号。`,

            explanation_cpp: `## 题目描述
8皇后问题共有92个解，按字典序排列，求第n个解。

## 算法思路
**预计算 + 查表**。

### 算法步骤
1. DFS产生8皇后的所有92个解
2. 将它们按某种顺序（通常按第一行皇后位置的升序）排序存储
3. 对每个查询，直接从预计算的表中返回第n个解

### 为什么预计算
8皇后只有92个解，且n的范围小。预先计算所有解可以避免每次查询都重新DFS。预计算只需要进行一次（O(8!) = O(40320)），之后每次查询都是O(1)。

### 解的存储
使用二维数组 \`solutions[100][8]\` 存储所有92个解，每个解是一个长度为8的数组，表示每行皇后所在的列号。

## 复杂度分析
- 预计算：O(8!) = O(40320)
- 每次查询：O(1)（直接查表）`,
            code_cpp: `#include <iostream>
using namespace std;

int solutions[100][8], cnt = 0;
int pos[8];
bool col[8], dg[20], udg[20];

void dfs(int row) {
    if (row == 8) {
        for (int i = 0; i < 8; i++) solutions[cnt][i] = pos[i];
        cnt++;
        return;
    }
    for (int j = 0; j < 8; j++) {
        if (!col[j] && !dg[row + j] && !udg[row - j + 8]) {
            pos[row] = j;
            col[j] = dg[row + j] = udg[row - j + 8] = true;
            dfs(row + 1);
            col[j] = dg[row + j] = udg[row - j + 8] = false;
        }
    }
}

int main() {
    dfs(0);
    int n;
    while (cin >> n) {
        for (int i = 0; i < 8; i++) cout << solutions[n-1][i] + 1;
        cout << endl;
    }
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
        {
            id: 49,
            title: "拨钟问题（DFS）",
            tags: ["深搜DFS", "枚举"],
            difficulty: "高",
            source: "XMUOJ | 2026年程序设计实践例题(05李胜睿班)",
            original_problem: `## 题目描述
与"拨钟问题（暴力枚举）"相同的问题，但要求使用DFS回溯方法求解。有9个时钟排成3×3矩阵，每个时钟初始指向0、3、6或9点。有9种操作，每种操作让特定时钟顺时针转90°（+3小时）。每种操作可执行多次（每次效果可累加，但每4次等于没执行）。求最短操作序列使所有时钟指向12点。

## 输入格式
9个整数，表示9个时钟的初始状态（0, 3, 6, 9）。

## 输出格式
一行，若干整数，表示需要执行的操作编号，操作可重复，按编号从小到大输出最短序列。`,

            explanation_cpp: `## 题目描述
与"拨钟问题（暴力枚举）"相同，但使用DFS+回溯的方式求解。

## 算法思路
**DFS回溯**代替多重循环枚举。

### 算法步骤
1. 定义9种操作及其影响的时钟
2. DFS(操作编号, 已执行次数)：
   - 尝试当前操作执行0-3次
   - 对每个尝试，进入下一个操作
3. 当9种操作都确定后，检查是否所有时钟指向12点
4. 记录最优解（总操作次数最少）

### 搜索树
```
                    dfs(1)
                   /  |  |  \
              cnt[1]=0 1  2  3
              /  |  |  \
          dfs(2) ...
         /  |  |  \
    ...  ...  ...  ...
```

每个节点有4个分支（0-3次），深度为9（9种操作），总共4⁹ = 262144个叶子节点。

### 与暴力枚举的比较
- 暴力枚举：用9重循环，代码冗长但执行效率相同
- DFS回溯：代码更简洁，递归结构清晰，更容易添加剪枝优化（如当前操作次数已超过最优解时提前剪枝）
- 本题中两种方法等价，DFS主要用于展示回溯的通用框架

### 影响表
9种操作分别影响以下时钟（编号1-9，3×3排列）：

| 操作 | 影响的时钟 |
|------|-----------|
| 1 | 1, 2, 4, 5 |
| 2 | 1, 2, 3 |
| 3 | 2, 3, 5, 6 |
| 4 | 1, 4, 7 |
| 5 | 2, 4, 5, 6, 8 |
| 6 | 3, 6, 9 |
| 7 | 4, 5, 7, 8 |
| 8 | 7, 8, 9 |
| 9 | 5, 6, 8, 9 |

## 复杂度分析
与暴力枚举相同：4⁹ = 262144 种组合。每个叶子检查9个时钟状态。总操作约 262144 × 9 ≈ 2.4×10⁶，非常快。`,
            code_cpp: `#include <iostream>
#include <cstring>
using namespace std;

const int affect[10][4] = {
    {}, {1,2,4,5}, {1,2,3}, {2,3,5,6},
    {1,4,7}, {2,4,5,6,8}, {3,6,9},
    {4,5,7,8}, {7,8,9}, {5,6,8,9}
};

int clock[10], cnt[10], best[10], bestCnt = 100;

void dfs(int op) {
    if (op > 9) {
        int temp[10];
        memcpy(temp, clock, sizeof(temp));
        for (int i = 1; i <= 9; i++) {
            for (int j = 0; j < 4 && affect[i][j]; j++) {
                temp[affect[i][j]] = (temp[affect[i][j]] + 3 * cnt[i]) % 12;
            }
        }
        for (int i = 1; i <= 9; i++)
            if (temp[i] != 0) return;
        int total = 0;
        for (int i = 1; i <= 9; i++) total += cnt[i];
        if (total < bestCnt) {
            bestCnt = total;
            memcpy(best, cnt, sizeof(cnt));
        }
        return;
    }
    for (cnt[op] = 0; cnt[op] < 4; cnt[op]++) {
        dfs(op + 1);
    }
}

int main() {
    for (int i = 1; i <= 9; i++) cin >> clock[i];
    dfs(1);
    for (int i = 1; i <= 9; i++)
        for (int j = 0; j < best[i]; j++)
            cout << i << " ";
    cout << endl;
    return 0;
}`,
            code_python: "",
            explanation_python: "",
        },
    ];
}
