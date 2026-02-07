package com.adtpractice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String adtType;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false, length = 5000)
    private String starterCode;

    @Column(nullable = false, length = 5000)
    private String testCode;

    @Column(nullable = false, length = 2000)
    private String expectedOutput;

    @Column(nullable = false)
    private String difficulty;

    @Column(nullable = false)
    private Integer sortOrder;

    public Challenge() {}

    public Challenge(String adtType, String title, String description, String starterCode,
                     String testCode, String expectedOutput, String difficulty, Integer sortOrder) {
        this.adtType = adtType;
        this.title = title;
        this.description = description;
        this.starterCode = starterCode;
        this.testCode = testCode;
        this.expectedOutput = expectedOutput;
        this.difficulty = difficulty;
        this.sortOrder = sortOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdtType() { return adtType; }
    public void setAdtType(String adtType) { this.adtType = adtType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStarterCode() { return starterCode; }
    public void setStarterCode(String starterCode) { this.starterCode = starterCode; }

    public String getTestCode() { return testCode; }
    public void setTestCode(String testCode) { this.testCode = testCode; }

    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}
