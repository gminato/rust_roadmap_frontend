import { Difficulty } from './types.js';

export const ROADMAP_DATA = [
  {
    id: 1,
    title: "Month 1: Fundamentals",
    focus: "Core syntax, ownership, borrowing, enums, traits",
    weeks: [
      {
        id: 1,
        title: "Week 1: Rust Fundamentals Practice",
        description: "Build a strong foundation. Focus on syntax, ownership, variables, and the Rust mindset.",
        topics: [
          "Variables & Mutability",
          "Ownership & Borrowing",
          "Data Types",
          "Functions",
          "Control Flow",
          "Arrays, Vectors & Slices",
          "Strings (&str vs String)",
          "Option & Result",
          "Cargo Basics"
        ],
        folderStructure: `week1/
├── q01_hello_rust/
├── q02_mutability/
├── q03_temp_converter/
├── q04_max_of_three/
├── q05_strlen/
├── q06_reverse_string/
├── q07_array_sum/
├── q08_second_largest/
├── q09_palindrome/
├── q10_fibonacci/
├── q11_factorial/
├── q12_ownership_demo/
├── q13_min_max_match/
├── q14_word_count/
├── q15_remove_duplicates/
├── q16_average_refs/
├── q17_char_frequency/
├── q18_max_occurrence/
├── q19_merge_sorted/
├── q20_rotate_vector/
└── README.md`,
        exercises: [
          {
            id: "q01",
            title: "Print 'Hello, Rust'",
            description: "Create a Rust program using Cargo that prints 'Hello, Rust!'.",
            hint: "Use `cargo new` to start. The macro is `println!`. Don't forget the semicolon.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q02",
            title: "Mutable vs Immutable",
            description: "Declare a variable as mutable, modify it, then shadow it.",
            hint: "Use `mut` keyword. Shadowing involves declaring `let` again with the same name.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q03",
            title: "Temperature Converter",
            description: "Convert Celsius ↔ Fahrenheit using functions.",
            hint: "F = C * 1.8 + 32. Be careful with floating point types (`f64`).",
            difficulty: Difficulty.Easy
          },
          {
            id: "q04",
            title: "Max of Three Numbers",
            description: "Write a function that returns the largest of three values.",
            hint: "You can use standard comparison operators or `std::cmp::max`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q05",
            title: "Implement my_strlen()",
            description: "Write your own function that calculates the length of a &str using .chars().",
            hint: "Strings in Rust are UTF-8. `.len()` returns bytes. Use `.chars().count()` for length.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q06",
            title: "Reverse a String",
            description: "Reverse a string using iterators.",
            hint: "Collect characters into a String after reversing: `.chars().rev().collect()`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q07",
            title: "Sum of Array Elements",
            description: "Use iter().sum() and manual iteration.",
            hint: "Try a `for` loop first, then refactor to functional style.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q08",
            title: "Find Second Largest Number",
            description: "Find the second largest number in a Vector. Return Some(value) or None.",
            hint: "Sort and pick, or iterate tracking top two. Handle vectors with < 2 elements.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q09",
            title: "Check Palindrome",
            description: "Check if a string is a palindrome using .chars().rev().",
            hint: "Compare the iterator with its reverse. `eq` helps.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q10",
            title: "Fibonacci Sequence",
            description: "Generate first N Fibonacci numbers iteratively.",
            hint: "Use a vector to store results or just print them. Start with 0, 1.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q11",
            title: "Factorial Using Recursion",
            description: "Return u128 for large values.",
            hint: "Watch out for stack overflow on huge numbers, but u128 handles up to 34!.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q12",
            title: "Ownership Example",
            description: "Write a program showing ownership move and borrowing rules.",
            hint: "Assign a String to another variable and try to use the first one. Then try with references.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q13",
            title: "Simple min/max with Match",
            description: "Implement simple min() and max() logic using match expressions.",
            hint: "Match on the comparison result (a > b).",
            difficulty: Difficulty.Easy
          },
          {
            id: "q14",
            title: "Count Words in a String",
            description: "Split by whitespace using .split_whitespace().",
            hint: "The iterator returned by split_whitespace has a `.count()` method.",
            difficulty: Difficulty.Easy
          },
          {
            id: "q15",
            title: "Remove Duplicates",
            description: "Remove duplicates from a Vector using a HashSet.",
            hint: "HashSets automatically enforce uniqueness. You can convert Vec -> Set -> Vec.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q16",
            title: "Average of Vector (Refs)",
            description: "Accept &[i32] and compute average.",
            hint: "Use a reference slice argument. Cast sum to f64 before dividing.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q17",
            title: "Character Frequency",
            description: "Use HashMap<char, usize> to count chars.",
            hint: "Iterate chars, use `.entry(c).or_insert(0) += 1`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "q18",
            title: "Most Frequent Character",
            description: "Find the max-frequency character in a string.",
            hint: "Build the map first (q17), then iterate the map to find the max value.",
            difficulty: Difficulty.Hard
          },
          {
            id: "q19",
            title: "Merge Two Sorted Vectors",
            description: "Return a sorted merged vector from two already sorted vectors.",
            hint: "Two pointer approach is O(n). Don't just append and sort (O(n log n)).",
            difficulty: Difficulty.Hard
          },
          {
            id: "q20",
            title: "Rotate Vector by K",
            description: "Handle left and right rotation of a vector.",
            hint: "Slice manipulation is cleaner than manual looping. `rotate_left` exists on slices too!",
            difficulty: Difficulty.Hard
          }
        ]
      },
      {
        id: 2,
        title: "Week 2: Ownership, Borrowing & References",
        description: "Master Rust’s core concept — ownership, borrowing, and references. This week prepares you for real Rust development by teaching the rules that make Rust memory-safe.",
        topics: [
          "Ownership Rules",
          "Move Semantics",
          "References (&T)",
          "Mutable References (&mut T)",
          "Borrow Checker Errors",
          "Slice Types (&[T], &str)",
          "Passing Data Safely",
          "Returning References",
          "Copy vs Non-Copy Types"
        ],
        folderStructure: `week2/
├── q01_owner_move/
├── q02_borrow_print/
├── q03_mut_append/
├── q04_copy_vs_move/
├── q05_sum_slice/
├── q06_max_slice/
├── q07_first_word/
├── q08_mut_borrow_error/
├── q09_struct_methods/
├── q10_borrow_conflict/
├── q11_return_ref/
├── q12_dangling_fix/
├── q13_find_char/
├── q14_wrapper_struct/
├── q15_shared_borrows/
├── q16_scope_mut/
├── q17_string_slice/
├── q18_string_vs_str/
├── q19_generic_accept/
├── q20_borrow_calc/
└── README.md`,
        exercises: [
          {
            id: "w2q01",
            title: "Ownership Move Demo",
            description: "Move a String into a function and try using it afterward (fix with references).",
            hint: "Passing a non-Copy type moves ownership. Use `&String` to borrow instead.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q02",
            title: "Borrowing Demo",
            description: "Write a function that takes &String and prints its length.",
            hint: "The parameter type should be `&String`. Access via standard dot notation.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q03",
            title: "Mutable Borrow Demo",
            description: "Write a function that takes &mut String and appends ' World'.",
            hint: "Use `push_str` on the mutable reference.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q04",
            title: "Copy Type Demo",
            description: "Show how integers behave differently than String on assignment.",
            hint: "Integers implement the `Copy` trait, so assignment makes a bitwise copy instead of a move.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q05",
            title: "Slice Sum",
            description: "Implement `fn sum_slice(nums: &[i32]) -> i32`. Sum all elements.",
            hint: "Iterate over the slice or use `.iter().sum()`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q06",
            title: "Max of Slice",
            description: "Implement `fn max_slice(nums: &[i32]) -> Option<i32>`. Return max or None.",
            hint: "Empty slices have no max. `iter().max()` returns an Option reference.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q07",
            title: "First Word Function",
            description: "Implement `fn first_word(s: &str) -> &str`. Cut at the first space.",
            hint: "Find the index of the space using `bytes().enumerate()` and return a string slice `&s[..i]`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q08",
            title: "Two Mutable Borrows Error",
            description: "Write invalid code with two &mut references — then fix it.",
            hint: "Rust allows only one mutable reference at a time. Fix by limiting the scope of the first borrow.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q09",
            title: "Borrowing in Struct Methods",
            description: "Implement methods using &self and &mut self.",
            hint: "`&self` is short for `self: &Self`. It borrows the instance.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q10",
            title: "Immutable + Mutable Conflict",
            description: "Demonstrate: You cannot have a mutable borrow while immutable borrows exist.",
            hint: "Try printing an immutable reference while a mutable reference is active in the same scope.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q11",
            title: "Return Reference Example",
            description: "Return a reference from a vector safely.",
            hint: "Input lifetime must match output lifetime. You can't return a reference to a local variable.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q12",
            title: "Prevent Dangling Reference",
            description: "Write code that would create a dangling reference — fix with ownership.",
            hint: "You cannot return `&String` created inside the function. Return `String` instead.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q13",
            title: "Implement find_char",
            description: "Implement `fn find_char(s: &str, target: char) -> Option<usize>`.",
            hint: "Use `chars().position(|c| c == target)`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q14",
            title: "Safe Wrapper Struct",
            description: "Build `struct Wrapper { data: Vec<i32> }` and add a safe getter.",
            hint: "The getter should return `Option<&i32>` to handle out-of-bounds access safely.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q15",
            title: "Shared Borrow Demo",
            description: "Borrow the same variable multiple times immutably.",
            hint: "Multiple `&T` are allowed simultaneously.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q16",
            title: "Mutable Borrow Scope",
            description: "Show how limiting scopes allows later mutable borrows.",
            hint: "Use curly braces `{}` to end the lifetime of a reference early.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w2q17",
            title: "Slicing Strings",
            description: "Extract 'hello' from 'hello rust' using slicing.",
            hint: "String slices look like `&s[0..5]`. Be careful with UTF-8 boundaries.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q18",
            title: "Own String vs Borrowed String",
            description: "Write 2 versions: one takes String (moves), one takes &str (borrows).",
            hint: "`fn foo(s: String)` vs `fn bar(s: &str)`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w2q19",
            title: "Function Overloading via Generics",
            description: "Write a function that accepts both String and &str.",
            hint: "Use `AsRef<str>` or `Into<String>` trait bounds depending on the goal.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w2q20",
            title: "Borrowing Calculator",
            description: "Build a calculator where functions take references to avoid copying.",
            hint: "Pass `&i32` or `&f64` to add/sub functions.",
            difficulty: Difficulty.Medium
          }
        ]
      },
      {
        id: 3,
        title: "Week 3: Enums, Pattern Matching & Errors",
        description: "Master enums + pattern matching — Rust's most expressive & powerful features. Learn to handle optional values and errors safely.",
        topics: [
          "Enums",
          "Match Expressions",
          "Option<T>",
          "Result<T, E>",
          "Pattern Guards",
          "Error Propagation (?)",
          "if let & while let"
        ],
        folderStructure: `week3/
├── q01_direction_enum/
├── q02_calc_enum/
├── q03_safe_div/
├── q04_tuple_match/
├── q05_temperature_enum/
├── q06_traffic_light/
├── q07_pattern_guard/
├── q08_safe_get/
├── q09_parse_result/
├── q10_sum_option/
├── q11_error_enum/
├── q12_mode_enum/
├── q13_nested_shape/
├── q14_area_calc/
├── q15_state_machine/
├── q16_match_range/
├── q17_match_strings/
├── q18_if_let/
├── q19_while_let/
├── q20_enum_cli/
└── README.md`,
        exercises: [
          {
            id: "w3q01",
            title: "Define a Direction Enum",
            description: "Implement a function that moves (x, y) based on direction (Up, Down, Left, Right).",
            hint: "Define `enum Direction { Up, Down, Left, Right }` and match on it.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q02",
            title: "Calculator Enum",
            description: "Use `enum Op { Add, Sub, Mul, Div }` to evaluate operations.",
            hint: "The function should take `Op` and two numbers.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q03",
            title: "Implement safe_div",
            description: "Implement `safe_div(a, b) -> Result<i32, String>`. Return error for division by zero.",
            hint: "Return `Ok(a/b)` or `Err(\"Division by zero\".to_string())`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q04",
            title: "Match on Tuples",
            description: "Write a match for `(x, y)` detecting quadrants or axes.",
            hint: "Match patterns like `(0, 0)`, `(0, _)`, `(_, 0)`, etc.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q05",
            title: "Temperature Enum",
            description: "Implement `Celsius(f64)` and `Fahrenheit(f64)` variants and a conversion function.",
            hint: "Enums can hold data: `enum Temp { Celsius(f64), Fahrenheit(f64) }`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q06",
            title: "Traffic Light Enum",
            description: "Implement `fn next(light: Light) -> Light` for state transitions.",
            hint: "Match `Red` => `Green`, `Green` => `Yellow`, etc.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q07",
            title: "Pattern Guard Demo",
            description: "Match even/odd numbers using pattern guards in a match arm.",
            hint: "Use `x if x % 2 == 0 => ...` inside the match arm.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q08",
            title: "Option-Based Get",
            description: "Implement `safe_get(&Vec<T>, index)` returning `Option<&T>`.",
            hint: "Use `vec.get(index)` which already returns an Option, or implement manually.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q09",
            title: "Parse String to Number",
            description: "Parse a string to a number, returning `Result<i32, &'static str>`.",
            hint: "Use `s.parse::<i32>()`. Map the error to your custom string error.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q10",
            title: "Sum of Options",
            description: "Implement `sum_option(Vec<Option<i32>>)`. Sum values, ignoring None.",
            hint: "Use `filter_map` or a loop with `if let Some(x)`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q11",
            title: "Custom Error Enum",
            description: "Create a custom error enum and implement `Display`.",
            hint: "`enum MyError { IoError, ParseError }`. Implement `std::fmt::Display`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q12",
            title: "App Mode Enum",
            description: "Match on 3 modes: Dev, Prod, Test.",
            hint: "Simple enum matching. Maybe print different configs for each.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q13",
            title: "Nested Enum Shape",
            description: "Create `enum Shape { Circle(f64), Rect(f64, f64) }`.",
            hint: "Enums variants can hold different types and amounts of data.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q14",
            title: "Area Calculation",
            description: "Implement area calculation for the Shape enum from q13.",
            hint: "Match on `Shape::Circle(r)` => `PI * r * r`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q15",
            title: "State Machine",
            description: "Build a simple state machine (e.g., Locked, Unlocked) with transitions.",
            hint: "Define methods on the enum that take `self` and return the new state.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w3q16",
            title: "Match Ranges",
            description: "Match numbers: 0..=10, 11..=20, else.",
            hint: "Use inclusive ranges in match arms: `0..=10 => ...`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q17",
            title: "Match Strings",
            description: "Match string slices like 'yes', 'y', 'ok'.",
            hint: "Match against string literals directly: `\"yes\" | \"y\" => ...`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q18",
            title: "if let Demo",
            description: "Use `if let` for concise single pattern matching.",
            hint: "Useful when you only care about one variant (e.g., `Some(x)`).",
            difficulty: Difficulty.Easy
          },
          {
            id: "w3q19",
            title: "while let Iterator",
            description: "Loop over an iterator using `while let`.",
            hint: "`while let Some(x) = iter.next() { ... }`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w3q20",
            title: "Enum-Based CLI",
            description: "Create a mock CLI argument handler that matches enum modes.",
            hint: "Parse args into an enum command, then execute.",
            difficulty: Difficulty.Hard
          }
        ]
      },
      {
        id: 4,
        title: "Week 4: Traits, Structs & Modules",
        description: "Learn how Rust organizes projects and abstracts behavior. Master traits, generics, and module systems.",
        topics: [
          "Traits",
          "Trait Bounds",
          "Structs & Methods",
          "Modules",
          "Visibility (pub)",
          "Crate Structure",
          "Derive Macros"
        ],
        folderStructure: `week4/
├── q01_area_trait/
├── q02_vehicle_trait/
├── q03_derive_debug/
├── q04_struct_methods/
├── q05_geometry_mod/
├── q06_lib_crate/
├── q07_trait_bound/
├── q08_generic_pair/
├── q09_trait_object/
├── q10_default_method/
├── q11_impl_display/
├── q12_mod_split/
├── q13_math_mod/
├── q14_re_export/
├── q15_generic_max/
├── q16_trait_inheritance/
├── q17_generic_enum/
├── q18_associated_types/
├── q19_newtype_wrapper/
├── q20_calculator_trait/
└── README.md`,
        exercises: [
          {
            id: "w4q01",
            title: "Define Area Trait",
            description: "Define a trait `Area` with a method `area(&self) -> f64` and implement it for Circle and Rectangle structs.",
            hint: "Use `trait Area { ... }` and `impl Area for StructName { ... }`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q02",
            title: "Vehicle Trait",
            description: "Build a `Vehicle` trait with a `drive` method & implement it for `Car` and `Bike` structs.",
            hint: "Each implementation can print a different message.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q03",
            title: "Derive Macros",
            description: "Create a struct and use `#[derive(Debug, Clone)]` to enable printing and cloning automatically.",
            hint: "Place the derive attribute directly above the struct definition.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q04",
            title: "Struct Methods",
            description: "Implement methods using `impl StructName` block (constructor `new` and instance methods).",
            hint: "`fn new() -> Self` is a common convention for constructors.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q05",
            title: "Geometry Module",
            description: "Write a module `geometry` containing a submodule `circle` with a public function.",
            hint: "Use `mod geometry { pub mod circle { ... } }`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q06",
            title: "Create a Lib Crate",
            description: "Build your own library crate using `cargo new --lib` and add a public function.",
            hint: "Library crates don't have a `main` function; they have `lib.rs`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q07",
            title: "Trait Bound Function",
            description: "Write a generic function `fn print_area<T: Area>(shape: T)` that calls the area method.",
            hint: "The `<T: Area>` syntax restricts T to types that implement the Area trait.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q08",
            title: "Generic Pair Struct",
            description: "Create a generic struct `Pair<T>` that holds two items of type T.",
            hint: "`struct Pair<T> { x: T, y: T }`.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q09",
            title: "Trait Objects",
            description: "Demonstrate dynamic dispatch using `Vec<Box<dyn Area>>` to store different shapes.",
            hint: "`Box<dyn Trait>` allows storing different types that implement the same trait in a collection.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w4q10",
            title: "Default Trait Methods",
            description: "Define a trait with a default implementation for one of its methods.",
            hint: "You can provide a function body inside the trait definition.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q11",
            title: "Implement Display",
            description: "Implement the `std::fmt::Display` trait for a custom struct to customize formatting.",
            hint: "You need to import `std::fmt` and implement the `fmt` method.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q12",
            title: "Module Splitting",
            description: "Organize code by moving module contents into separate files (`mod.rs` or generic names).",
            hint: "A module `foo` can be in `foo.rs` or `foo/mod.rs`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q13",
            title: "Math Module Hierarchy",
            description: "Create a module structure `math::basic::add` and `math::basic::mul`.",
            hint: "Use nested `pub mod` declarations.",
            difficulty: Difficulty.Easy
          },
          {
            id: "w4q14",
            title: "Re-exporting (pub use)",
            description: "Use `pub use` to bring items from a nested module into the parent module's scope.",
            hint: "This helps flatten the public API of your library.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q15",
            title: "Generic Max Function",
            description: "Write `fn max<T: Ord>(a: T, b: T) -> T` that works for any comparable type.",
            hint: "The `Ord` trait is required for comparison operators like `>`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q16",
            title: "Trait Inheritance",
            description: "Define `trait B: A {}`. Implement B for a type (requires implementing A first).",
            hint: "Supertraits require the implementing type to also implement the supertrait.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w4q17",
            title: "Generic Enum",
            description: "Create a generic enum similar to Option or Result.",
            hint: "`enum MyOption<T> { Some(T), None }`.",
            difficulty: Difficulty.Medium
          },
          {
            id: "w4q18",
            title: "Associated Types",
            description: "Define a trait `Iterator` (simplified) using an associated type `Item`.",
            hint: "Use `type Item;` inside the trait definition.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w4q19",
            title: "Newtype Pattern",
            description: "Implement a trait for an external type by wrapping it in a local struct (Newtype pattern).",
            hint: "You can't implement external traits on external types directly. Wrap `Vec<T>` in `struct MyVec(Vec<T>)`.",
            difficulty: Difficulty.Hard
          },
          {
            id: "w4q20",
            title: "Trait-Based Calculator",
            description: "Build a calculator where operations are defined as structs implementing an `Operation` trait.",
            hint: "The trait could have an `execute` method.",
            difficulty: Difficulty.Hard
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Month 2: Intermediate",
    focus: "Traits, generics, smart pointers, iterators",
    weeks: []
  },
  {
    id: 3,
    title: "Month 3: Systems",
    focus: "Files, concurrency, performance, unsafe",
    weeks: []
  }
];