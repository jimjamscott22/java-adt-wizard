import {
  Box,
  Puzzle,
  Lock,
  EyeOff,
  GitBranch,
  Repeat,
  ShieldCheck,
  Layers,
} from 'lucide-react';

const oopData = [
  {
    id: 'abstraction',
    title: 'Abstraction',
    icon: Box,
    color: 'from-blue-500 to-blue-700',
    description:
      'Abstraction means exposing only essential features of an object while hiding the complex implementation details. In Java, abstract classes and interfaces define "what" an object does without specifying "how."',
    keyPoints: [
      'Focus on what an object does, not how it does it',
      'Abstract classes can have both abstract and concrete methods',
      'Interfaces define a contract that implementing classes must fulfill',
      'Reduces complexity by letting users interact with a simplified model',
    ],
    javaExample: `// Abstract class defines the "what"
abstract class Shape {
    abstract double area();
    abstract double perimeter();

    // Concrete method shared by all shapes
    void display() {
        System.out.println("Area: " + area());
    }
}

// Concrete class defines the "how"
class Circle extends Shape {
    private double radius;

    Circle(double radius) { this.radius = radius; }

    double area() { return Math.PI * radius * radius; }
    double perimeter() { return 2 * Math.PI * radius; }
}`,
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    icon: Lock,
    color: 'from-emerald-500 to-emerald-700',
    description:
      'Encapsulation bundles data (fields) and the methods that operate on that data into a single unit (class), restricting direct access to internal state. This is achieved through access modifiers (private, protected, public).',
    keyPoints: [
      'Fields should be private — access via getters and setters',
      'Protects object integrity by controlling how data is modified',
      'Allows internal implementation changes without affecting external code',
      'Access modifiers: private → default → protected → public',
    ],
    javaExample: `public class BankAccount {
    private double balance;  // hidden from outside
    private String owner;

    public BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial;
    }

    // Controlled access through methods
    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;  // validation built in
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}`,
  },
  {
    id: 'information-hiding',
    title: 'Information Hiding',
    icon: EyeOff,
    color: 'from-violet-500 to-violet-700',
    description:
      'Information hiding goes beyond encapsulation — it\'s a design principle where modules hide internal decisions and implementation details so that other modules depend only on the public interface, not internal structure.',
    keyPoints: [
      'Hide design decisions that are likely to change',
      'Clients depend on the interface, not the implementation',
      'Enables swapping implementations without breaking client code',
      'Related to but distinct from encapsulation (encapsulation is the mechanism, information hiding is the principle)',
    ],
    javaExample: `// Client code uses the List interface — doesn't know
// if it's backed by an array or linked nodes
public class StudentRoster {
    // Implementation detail is hidden
    private List<String> students = new ArrayList<>();

    public void enroll(String name) {
        students.add(name);
    }

    public boolean isEnrolled(String name) {
        return students.contains(name);
    }

    // We could switch to LinkedList without
    // changing any code that uses StudentRoster
}`,
  },
  {
    id: 'decomposition',
    title: 'Decomposition',
    icon: Puzzle,
    color: 'from-amber-500 to-amber-700',
    description:
      'Decomposition breaks a complex problem into smaller, manageable sub-problems. Each piece can be developed, tested, and understood independently. This is the foundation of modular design.',
    keyPoints: [
      'Break large problems into smaller, independent pieces',
      'Each method/class should have a single, clear responsibility',
      'Enables parallel development and easier testing',
      'Top-down (start with the big picture) or bottom-up (build small pieces first)',
    ],
    javaExample: `// Bad: one giant method doing everything
// Good: decomposed into focused methods

public class OrderProcessor {
    public void processOrder(Order order) {
        validateOrder(order);       // step 1
        calculateTotal(order);      // step 2
        applyDiscount(order);       // step 3
        processPayment(order);      // step 4
        sendConfirmation(order);    // step 5
    }

    private void validateOrder(Order order) {
        if (order.getItems().isEmpty())
            throw new IllegalArgumentException("Empty order");
    }

    private void calculateTotal(Order order) {
        double total = order.getItems().stream()
            .mapToDouble(Item::getPrice)
            .sum();
        order.setTotal(total);
    }

    // ... each step is a small, testable method
}`,
  },
  {
    id: 'separation-of-concerns',
    title: 'Separation of Behavior & Implementation',
    icon: Layers,
    color: 'from-rose-500 to-rose-700',
    description:
      'Separating behavior (what something does) from implementation (how it does it) uses interfaces to define contracts. Multiple classes can implement the same behavior differently.',
    keyPoints: [
      'Interfaces define behavior; classes provide implementation',
      'Clients program to the interface, not the implementation',
      'Enables polymorphism — different implementations, same contract',
      'Foundation of the Strategy and Template Method design patterns',
    ],
    javaExample: `// Behavior defined by interface
interface Sorter<T extends Comparable<T>> {
    void sort(List<T> items);
}

// Implementation 1: simple but O(n²)
class BubbleSorter<T extends Comparable<T>> implements Sorter<T> {
    public void sort(List<T> items) {
        // bubble sort implementation
    }
}

// Implementation 2: faster O(n log n)
class MergeSorter<T extends Comparable<T>> implements Sorter<T> {
    public void sort(List<T> items) {
        // merge sort implementation
    }
}

// Client code doesn't care which implementation
void processData(Sorter<String> sorter, List<String> data) {
    sorter.sort(data);  // works with any Sorter
}`,
  },
  {
    id: 'inheritance',
    title: 'Inheritance & Class Hierarchies',
    icon: GitBranch,
    color: 'from-cyan-500 to-cyan-700',
    description:
      'Inheritance creates an "is-a" relationship where a subclass inherits fields and methods from a superclass. This enables code reuse and establishes a type hierarchy for polymorphism.',
    keyPoints: [
      'Subclass inherits all non-private members from superclass',
      'Use extends for class inheritance, implements for interfaces',
      'Java supports single class inheritance but multiple interface implementation',
      '"Is-a" relationship: a Dog is-a Animal, a Circle is-a Shape',
    ],
    javaExample: `class Animal {
    protected String name;

    Animal(String name) { this.name = name; }

    void speak() {
        System.out.println(name + " makes a sound");
    }
}

class Dog extends Animal {
    private String breed;

    Dog(String name, String breed) {
        super(name);           // call parent constructor
        this.breed = breed;
    }

    @Override
    void speak() {             // method overriding
        System.out.println(name + " barks!");
    }

    void fetch() {             // new behavior
        System.out.println(name + " fetches the ball");
    }
}

// Polymorphism in action
Animal pet = new Dog("Rex", "Lab");
pet.speak();  // "Rex barks!" — calls overridden method`,
  },
  {
    id: 'method-overriding',
    title: 'Method Overriding',
    icon: Repeat,
    color: 'from-pink-500 to-pink-700',
    description:
      'Method overriding lets a subclass provide its own implementation of a method already defined in its superclass. The method signature must match exactly. This is the key mechanism for runtime polymorphism.',
    keyPoints: [
      'Same method name, parameters, and return type as parent',
      '@Override annotation catches mistakes at compile time',
      'The overriding method cannot be more restrictive in access',
      'super.method() calls the parent version from within the override',
    ],
    javaExample: `class Vehicle {
    double fuelEfficiency() {
        return 25.0;  // default MPG
    }

    String describe() {
        return "Vehicle: " + fuelEfficiency() + " MPG";
    }
}

class HybridCar extends Vehicle {
    @Override
    double fuelEfficiency() {
        return 50.0;  // better efficiency
    }

    @Override
    String describe() {
        // Use super to include parent behavior
        return "Hybrid " + super.describe();
    }
}

Vehicle v = new HybridCar();
System.out.println(v.describe());
// "Hybrid Vehicle: 50.0 MPG"
// fuelEfficiency() resolved at runtime`,
  },
  {
    id: 'input-validation',
    title: 'Input Validation',
    icon: ShieldCheck,
    color: 'from-teal-500 to-teal-700',
    description:
      'Input validation ensures that data entering your program meets expected criteria before processing. Validate at system boundaries — user input, file I/O, network data — to prevent bugs and security issues.',
    keyPoints: [
      'Validate early, fail fast with clear error messages',
      'Use exceptions for invalid state (IllegalArgumentException)',
      'Distinguish between user errors (recoverable) and programming errors',
      'Never trust external input — always validate at boundaries',
    ],
    javaExample: `public class StudentGrade {
    private String name;
    private int grade;

    public StudentGrade(String name, int grade) {
        // Validate at construction time
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException(
                "Name cannot be null or blank");
        }
        if (grade < 0 || grade > 100) {
            throw new IllegalArgumentException(
                "Grade must be 0-100, got: " + grade);
        }
        this.name = name.trim();
        this.grade = grade;
    }

    // With Scanner input
    public static int readGrade(Scanner scanner) {
        while (true) {
            System.out.print("Enter grade (0-100): ");
            if (scanner.hasNextInt()) {
                int g = scanner.nextInt();
                if (g >= 0 && g <= 100) return g;
                System.out.println("Must be 0-100.");
            } else {
                scanner.next();  // discard bad input
                System.out.println("Enter a number.");
            }
        }
    }
}`,
  },
];

export default oopData;
